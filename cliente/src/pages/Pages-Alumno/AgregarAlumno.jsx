import { useForm } from 'react-hook-form';
import { useAlumno } from '../../context/AlumnoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function AgregarAlumno() {
  const { register, handleSubmit } = useForm();
  const { createAlumno } = useAlumno();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Aplicar .trim() a todos los campos de tipo string
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : value
        ])
      );

      await createAlumno(cleanedData); // Enviar los datos "limpios" al backend
      navigate('/ver-alumnos');
    } catch (error) {
      // Si ocurre un error, muestra error con Toast
      if (error.response && error.response.data) {
        error.response.data.forEach((errMessage) => {
          toast.error(errMessage); // Muestra los errores de validación
        });
      } else {
        // Error general
        toast.error("Ha ocurrido un error en el servidor.");
      }
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md relative'>
        <form onSubmit={onSubmit}>
          <button 
            className='absolute top-2 right-10 text-2xl text-white hover:text-red-600' 
            onClick={() => navigate('/ver-alumnos')}>
            x
          </button>
          <label htmlFor="nombreAlu">Nombre: </label>
          <input
            type='text'
            placeholder='Nombre'
            {...register('nombreAlu', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />

          <label htmlFor="apellidoAlu">Apellidos: </label>
          <input
            type='text'
            placeholder='Apellidos'
            {...register('apellidoAlu', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="codigo">Código Institucional: </label>
          <input
            type='text'
            placeholder='Código'
            {...register('codigo', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="dni">DNI: </label>
          <input
            type='text'
            placeholder='DNI'
            {...register('dni', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="facultad">Facultad: </label>
          <input
            type='text'
            placeholder='Facultad'
            {...register('facultad', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <label htmlFor="correoInst">Correo Institucional: </label>
          <input
            type='email'
            placeholder='Email'
            {...register('correoInst', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />

          <button className="bg-green-800 px-3 py-2 rounded-md w-full mt-4">Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default AgregarAlumno;
