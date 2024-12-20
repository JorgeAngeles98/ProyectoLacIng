import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProfesor } from '../context/ProfesorContext';

function ProfesorForm() {
    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm();
    const { createProfesor, updateProfesor, getProfesor, profesores } = useProfesor();
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
    }, [params.id, getProfesor, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        data.nombre = data.nombre.trim();
        data.apellido = data.apellido.trim();
        data.codigo = data.codigo.trim();
        data.correo = data.correo.trim();
        data.estado = "Activo";

        const profesorExistente = profesores.find(profesor => (profesor.correo === data.correo || profesor.codigo === data.codigo) && profesor._id !== params.id);
        if (profesorExistente) {
            if (profesorExistente.correo === data.correo) {
                setError('correo', { type: 'manual', message: 'El correo ya está registrado' });
            }
            if (profesorExistente.codigo === data.codigo) {
                setError('codigo', { type: 'manual', message: 'El DNI ya está registrado' });
            }
            return;
        }

        if (!data.nombre) {
            setError('nombre', { type: 'manual', message: 'El nombre es obligatorio' });
            return;
        }
        if (!data.apellido) {
            setError('apellido', { type: 'manual', message: 'El apellido es obligatorio' });
            return;
        }
        if (!data.codigo) {
            setError('codigo', { type: 'manual', message: 'El DNI es obligatorio' });
            return;
        }
        if (!/^\d{8}$/.test(data.codigo)) {
            setError('codigo', { type: 'manual', message: 'El DNI debe tener 8 dígitos' });
            return;
        }
        if (!data.correo) {
            setError('correo', { type: 'manual', message: 'El correo es obligatorio' });
            return;
        }
        if (!/\S+@\S+\.\S+/.test(data.correo)) {
            setError('correo', { type: 'manual', message: 'El correo no es válido' });
            return;
        }

        if (params.id) {
            await updateProfesor(params.id, data);
            toast.success('Profesor actualizado exitosamente');
        } else {
            await createProfesor(data);
            toast.success('Profesor creado exitosamente');
        }
        navigate('/profesor');
    });

    return (
        <div className="flex pt-24 items-center justify-center">
            <div className='bg-white max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <h2 className="text-2xl mb-4">Formulario Profesor</h2>
                    <label htmlFor="nombre">Nombres: </label>
                    <input type="text"
                        placeholder='Nombre'
                        {...register('nombre')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    {errors.nombre && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.nombre.message}</p>}
                    <label htmlFor="apellido">Apellidos: </label>
                    <input type="text"
                        placeholder='Apellido'
                        {...register('apellido')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                    />
                    {errors.apellido && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.apellido.message}</p>}
                    <label htmlFor="codigo">DNI: </label>
                    <input type="text"
                        placeholder='Codigo'
                        {...register('codigo')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                    />
                    {errors.codigo && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.codigo.message}</p>}
                    <label htmlFor="correo">Correo Institucional: </label>
                    <input type="text"
                        placeholder='Correo'
                        {...register('correo')}
                        className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
                    />
                    {errors.correo && <p className="text-red-500 text-xs italic mt-1 mb-2">{errors.correo.message}</p>}
                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 my-2 rounded-md">Guardar</button>
                </form>
            </div>
        </div>
    );
}

export default ProfesorForm;