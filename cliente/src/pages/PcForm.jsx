import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePc } from '../context/PcContext';
import { toast } from 'react-toastify';

function PcForm() {
    const { register, handleSubmit, setError, setValue, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            estado: 'Operativo'
        }
    });
    const { createPc, getPc, updatePc, getPcsActivos, countPcsBySalonOpIno, pcs } = usePc();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const mode = new URLSearchParams(location.search).get('mode') || 'create';
    const [isReadOnly, setIsReadOnly] = useState(mode === 'view');
    const [salonId, setSalonId] = useState(null);
    const titulos = {
        view: 'Datos de la PC',
        edit: 'Editar PC',
        create: 'Crear PC'
    };

    useEffect(() => {
        async function loadPc() {
            if (id && (mode === 'edit' || mode === 'view')) {
                const pc = await getPc(id);
                setValue('marca', pc.marca);
                setValue('serial', pc.serial);
                setValue('numpatrimonio', pc.numpatrimonio);
                setValue('nombre', pc.nombre);
                setValue('estado', pc.estado || 'Operativo'); // Valor por defecto
                setValue('observacion', pc.observacion);
                if (Array.isArray(pc.salon) && pc.salon.length > 0) {
                    setSalonId(pc.salon[0]._id || pc.salon[0]); // Asigna el ID del primer salón en el arreglo
                } else {
                    setSalonId(pc.salon); // Asigna el ID del salón directamente si no es un arreglo
                }
                if (mode === 'view') {
                    setIsReadOnly(true);
                }
            } else if (mode === 'create') {
                setSalonId(id); // Asigna el ID del salón desde la URL
                reset({ estado: 'Operativo' }); // Valor por defecto
            }
        }
        loadPc();
    }, [id, setValue, getPc, mode, reset]);

    useEffect(() => {
        async function fetchPcs() {
            await getPcsActivos();
        }
        fetchPcs();
    }, []); // Llamada única a getPcs cuando el componente se monta

    const onSubmit = handleSubmit(async (data) => {
        data.marca = data.marca.trim();
        data.serial = data.serial.trim();
        data.numpatrimonio = data.numpatrimonio.trim();
        data.nombre = data.nombre.trim();
        data.estado = data.estado.trim();

        try {
            if (mode === 'create') {
                const count = await countPcsBySalonOpIno(salonId);
                if (count >= 21) {
                    toast.error('No se puede ingresar la PC. El salón ya tiene 21 PCs operativas o inoperativas.');
                    return;
                }
            }

            const pcExistente = pcs.find(pc => 
                (pc.serial === data.serial || pc.numpatrimonio === data.numpatrimonio || pc.nombre === data.nombre) && pc._id !== id
            );

            if (pcExistente) {
                if (pcExistente.serial === data.serial) {
                    setError('serial', { type: 'manual', message: 'El serial ya está registrado' });
                }
                if (pcExistente.numpatrimonio === data.numpatrimonio) {
                    setError('numpatrimonio', { type: 'manual', message: 'El número de patrimonio ya está registrado' });
                }
                if (pcExistente.nombre === data.nombre) {
                    setError('nombre', { type: 'manual', message: 'El nombre ya está registrado' });
                }
                return;
            }

            if (mode === 'edit' && id) {
                await updatePc(id, data);
                toast.success('PC editada con éxito');
                navigate(`/pcporsalon/${salonId}`);
            } else if (mode === 'create') {
                await createPc({ ...data, salon: salonId });
                toast.success('PC creada con éxito');
                navigate(`/pcporsalon/${salonId}`);
            }
        } catch (error) {
            console.error("Algo salió mal al registrar la PC", error);
            toast.error("Algo salió mal al registrar la PC");
        }
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className='bg-white max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <button 
                        className='absolute top-2 right-10 text-2xl text-white hover:text-red-600' 
                        onClick={() => navigate(`/pcporsalon/${salonId}`)}>
                        x
                    </button>
                    <h2 className="text-3xl font-bold my-2">{titulos[mode]}</h2>
                    <label htmlFor="marca">Marca: </label>
                    <input type="text"
                        placeholder='Marca'
                        {...register('marca', { required: 'La marca es obligatoria' })}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                        readOnly={isReadOnly}
                    />
                    {errors.marca && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.marca.message}</p>}
                    <label htmlFor="serial">Serial: </label>
                    <input type="text"
                        placeholder='Serial'
                        {...register('serial', { required: 'El serial es obligatorio' })}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    {errors.serial && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.serial.message}</p>}
                    <label htmlFor="numpatrimonio">Número de Patrimonio: </label>
                    <input type="text"
                        placeholder='Número de Patrimonio'
                        {...register('numpatrimonio', { required: 'El número de patrimonio es obligatorio' })}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    {errors.numpatrimonio && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.numpatrimonio.message}</p>}
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text"
                        placeholder='Nombre'
                        {...register('nombre', { required: 'El nombre es obligatorio' })}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    {errors.nombre && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.nombre.message}</p>}
                    <label htmlFor="estado">Estado: </label>
                    {isReadOnly ? (
                        <p className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'>{watch('estado')}</p>
                    ) : (
                        <select
                            id="estado"
                            {...register('estado', { required: 'El estado es obligatorio' })}
                            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        >
                            <option value="Operativo">Operativo</option>
                            <option value="Inoperativo">Inoperativo</option>
                        </select>
                    )}
                    {errors.estado && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.estado.message}</p>}
                    <label htmlFor="observacion">Observación: </label>
                    <input type="text"
                        placeholder='Observación'
                        {...register('observacion', { required: 'La observación es obligatoria' })}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    {errors.observacion && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.observacion.message}</p>}
                    {mode !== 'view' && (
                        <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 my-2 rounded-md">Guardar</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PcForm;