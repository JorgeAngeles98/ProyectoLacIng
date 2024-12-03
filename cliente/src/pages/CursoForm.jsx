import { useForm } from 'react-hook-form';
import { useCurso } from '../context/CursoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function CursoForn() {

    const { register, handleSubmit, setValue } = useForm();
    const { createCurso, getCurso, actuzaliarCurso } = useCurso();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadCurso() {
            if (params.id) {
                const curso = await getCurso(params.id);
                console.log(curso);
                setValue('nombre', curso.nombre);
                setValue('codigo', curso.codigo);
                setValue('carrera', curso.carrera);
            }
        }
        loadCurso();
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            actuzaliarCurso(params.id, data);
        } else {
            createCurso(data);
        }
        navigate('/curso');
    });

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <h2 className="text-3xl font-bold my-2">Formulario Curso</h2>
                    <label htmlFor="nombre">nombre: </label>
                    <input type="text"
                        placeholder='Nombre'
                        {...register('nombre')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <label htmlFor="codigo">Codigo: </label>
                    <input type="text"
                        placeholder='Codigo'
                        {...register('codigo')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <label htmlFor="carrera">Carrera: </label>
                    <input type="text"
                        placeholder='Carrera'
                        {...register('carrera')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        autoFocus
                    />
                    <button className="bg-indigo-500 px-3 py-2 my-2 rounded-md">Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default CursoForn;