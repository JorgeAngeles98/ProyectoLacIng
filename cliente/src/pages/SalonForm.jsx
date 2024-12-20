import { useForm } from 'react-hook-form';
import { useSalon } from '../context/SalonContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


function SalonFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createSalon, getSalon, actuzaliarSalon } = useSalon();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadSalon() {
      if (params.id) {
        const salon = await getSalon(params.id);
        console.log(salon);
        setValue('nombre', salon.nombre);
        setValue('descripcion', salon.descripcion);
        /*setValue('capacidad', salon.capacidad);
        setValue('codigo', salon.codigo);*/
        
      }
    }
    loadSalon();
  }, [])

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      actuzaliarSalon(params.id, data);
    } else {
      createSalon(data);
    }

    navigate('/salon');
  })

  return (
    <dir className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className='bg-white max-w-md w-full p-8 rounded-md'>
        <form onSubmit={onSubmit}>

          <h2 className="text-3xl font-bold my-2">Formulario Salon</h2>

          <label htmlFor="nombre">Nombre: </label>
          <input
            type='text'
            placeholder='Nombre'
            {...register('nombre')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            autoFocus
          />

          <label htmlFor="descripcion">Descripción: </label>
          <textarea rows="3"
            placeholder='Descripción'
            {...register('descripcion')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
          ></textarea>

          {/*<label htmlFor="capacidad">Capacidad: </label>
          <input
            type='number'
            placeholder='Capacidad'
            {...register('capacidad')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />

          <label htmlFor="codigo">Codigo: </label>
          <input
            type='text'
            placeholder='Codigo'
            {...register('codigo')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />*/}

          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 my-2 rounded-md">Guardar</button>
        </form>
      </div>
    </dir>

  );
};

export default SalonFormPage;

