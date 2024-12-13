import { useForm } from 'react-hook-form';
import { useProfesor } from '../context/ProfesorContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ProfesorForm() {

    const { register, handleSubmit, setValue } = useForm();
    const { createProfesor, getProfesor, updateProfesor } = useProfesor();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadProfesor() {
            if (params.id) {
                const profesor = await getProfesor(params.id);
                console.log(profesor);
                setValue('nombre', profesor.nombre);
                setValue('apellido', profesor.apellido);
                setValue('codigo', profesor.codigo);
                setValue('correo', profesor.correo);
            }
        }
        loadProfesor();
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateProfesor(params.id, data);
        } else {
            createProfesor(data);
        }
        navigate('/profesor');
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className='bg-white max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <h2 className="text-3xl font-bold my-2">Formulario profesor</h2>
                    <label htmlFor="nombre">Nombres: </label>
                    <input type="text"
                        placeholder='Nombre'
                        {...register('nombre')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <label htmlFor="apellido">Apellidos: </label>
                    <input type="text"
                        placeholder='Apellido'
                        {...register('apellido')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <label htmlFor="codigo">Codigo / DNI: </label>
                    <input type="text"
                        placeholder='Codigo'
                        {...register('codigo')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <label htmlFor="correo">Correo Institucional: </label>
                    <input type="text"
                        placeholder='Correo'
                        {...register('correo')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 my-2 rounded-md">Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default ProfesorForm;