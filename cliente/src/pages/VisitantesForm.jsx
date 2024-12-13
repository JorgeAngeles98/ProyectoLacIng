import { useForm } from 'react-hook-form';
import { useVisitante } from '../context/VisitanteContext';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function VisitantesForm({ onVisitanteAdded }) {
    const { register, handleSubmit } = useForm();
    const { createVisitante, visitantes, getVisitantesByPc } = useVisitante();
    const { id: pcId } = useParams();

    useEffect(() => {
        if (pcId) {
            getVisitantesByPc(pcId);
        }
    }, [pcId, getVisitantesByPc]);

    const onSubmit = handleSubmit((data) => {
        const visitanteEnCurso = visitantes.find(visitante => visitante.pc && visitante.pc._id === pcId && visitante.estado === 'En Curso');
        if (visitanteEnCurso) {
            toast.error('No se puede asignar la PC porque ya hay un visitante en curso.');
            return;
        }

        createVisitante({ ...data, pc: pcId });
        toast.success('Visitante creado exitosamente.');
        getVisitantesByPc(pcId);
        onVisitanteAdded();
    });

    return (
        <div className="bg-zinc-800 p-6 rounded-md shadow-md">
            <form onSubmit={onSubmit} className="text-left">
                <h2 className="text-3xl font-bold my-2 text-white">Formulario Visitante</h2>
                <label htmlFor="nombre" className="block text-white">Nombres: </label>
                <input type="text"
                    placeholder='Nombre'
                    {...register('nombre')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoFocus
                />
                <label htmlFor="apellido" className="block text-white">Apellidos: </label>
                <input type="text"
                    placeholder='Apellido'
                    {...register('apellido')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <label htmlFor="codigo" className="block text-white">Codigo / DNI: </label>
                <input type="text"
                    placeholder='Codigo'
                    {...register('codigo')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <label htmlFor="correo" className="block text-white">Correo: </label>
                <input type="text"
                    placeholder='Correo'
                    {...register('correo')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <label htmlFor="actividad" className="block text-white">Actividad: </label>
                <input type="text"
                    placeholder='Actividad'
                    {...register('actividad')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <button className="bg-indigo-500 px-3 py-2 my-2 rounded-md text-white">Guardar</button>
            </form>
        </div>
    );
}

export default VisitantesForm;