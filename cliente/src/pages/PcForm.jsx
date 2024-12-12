import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePc } from '../context/PcContext';
import { toast } from 'react-toastify';

function PcForm() {
    const { register, handleSubmit, setValue } = useForm();
    const { createPc, getPc, updatePc } = usePc();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // Obtener el modo desde la ubicación o establecer un valor predeterminado
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
                setValue('estado', pc.estado);
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
            }
        }
        loadPc();
    }, [id, setValue, getPc, mode]);

    const onSubmit = handleSubmit(async (data) => {
        try {
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
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
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
                        {...register('marca')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                        readOnly={isReadOnly}
                    />
                    <label htmlFor="serial">Serial: </label>
                    <input type="text"
                        placeholder='Serial'
                        {...register('serial')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    <label htmlFor="numpatrimonio">Número de Patrimonio: </label>
                    <input type="text"
                        placeholder='Número de Patrimonio'
                        {...register('numpatrimonio')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    <label htmlFor="nombre">Nombre: </label>
                    <input type="text"
                        placeholder='Nombre'
                        {...register('nombre')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    <label htmlFor="estado">Estado: </label>
                    <input type="text"
                        placeholder='Estado'
                        {...register('estado')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    <label htmlFor="observacion">Observación: </label>
                    <input type="text"
                        placeholder='Observación'
                        {...register('observacion')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        readOnly={isReadOnly}
                    />
                    {mode !== 'view' && (
                        <button type="submit" className="bg-indigo-500 px-3 py-2 my-2 rounded-md">Guardar</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PcForm;