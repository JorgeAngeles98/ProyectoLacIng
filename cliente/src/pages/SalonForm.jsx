import { useForm } from 'react-hook-form';
import { useSalon } from '../context/SalonContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SalonFormPage() {
    const { register, handleSubmit, setValue, formState: { errors }, reset} = useForm();
    const { createSalon, getSalon, actuzaliarSalon, checkDuplicateName } = useSalon();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadSalon() {
            if (params.id) {
                const salon = await getSalon(params.id);
                console.log(salon);
                setValue('nombre', salon.nombre);
                setValue('descripcion', salon.descripcion);
                setValue('codigo', salon.codigo);
            }
        }
        loadSalon();
    }, [params.id, getSalon, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        if (!params.id) {
            const isDuplicate = await checkDuplicateName(data.nombre);
            if (isDuplicate) {
                alert('El nombre ya está en uso. Por favor, elija otro nombre.');
                return;
            }
            await createSalon(data);
        } else {
            await actuzaliarSalon(params.id, data);
        }

        navigate('/salon');
    });

    const handleCancel = () => {
      navigate('/salon');
    };

    const handleReset = () => {
        reset();
    };

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className='bg-white max-w-md w-full p-8 rounded-md'>
                <form onSubmit={onSubmit}>
                    <h2 className="text-3xl font-bold my-2">Formulario Salon</h2>

                    <label htmlFor="nombre">Nombre: </label>
                    <input
                        type='text'
                        placeholder='Nombre'
                        {...register('nombre', {
                          required: 'El nombre es obligatorio',
                          pattern: {
                              value: /^G-\d{1,3}[A-Z]$/,
                              message: 'El nombre debe seguir el formato "G-" seguido de un número del 0 al 99 y una letra mayúscula'
                          }
                      })}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}

                    <label htmlFor="codigo">Codigo: </label>
                    <input
                        type='text'
                        placeholder='Codigo'
                        {...register('codigo')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                    />

                    <label htmlFor="descripcion">Descripción: </label>
                    <textarea rows="3"
                        placeholder='Descripción'
                        {...register('descripcion')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                    ></textarea>

                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 my-2 rounded-md">Guardar</button>
                    <button type="button" onClick={handleReset} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 my-2 rounded-md ml-11">Limpiar</button>
                    <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 my-2 rounded-md ml-11">Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default SalonFormPage;