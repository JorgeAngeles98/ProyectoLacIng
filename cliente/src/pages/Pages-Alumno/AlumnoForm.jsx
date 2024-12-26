import { useForm } from 'react-hook-form';
import { useAlumno } from '../../context/AlumnoContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CursosTable from '../../components/CursosTable';

function AlumnoForm() {
  const { register, handleSubmit, setValue } = useForm();
  const { createAlumno, getAlumnoPorId, updateAlumno } = useAlumno();
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Obtener el modo desde la ubicación o establecer un valor predeterminado
  const mode = new URLSearchParams(location.search).get('mode') || 'create';
  const [isReadOnly, setIsReadOnly] = useState(mode === 'view');
  const titulos = {
    view: 'Datos del Alumno',
    edit: 'Editar Alumno',
    create: 'Crear Alumno'
  };

  useEffect(() => {
    async function loadAlumno() {
      if (id) {
        const response = await getAlumnoPorId(id); 
        if (response) {
          setValue('nombreAlu', response.alumno.nombreAlu);
          setValue('apellidoAlu', response.alumno.apellidoAlu);
          setValue('codigo', response.alumno.codigo);
          setValue('dni', response.alumno.dni);
          setValue('facultad', response.alumno.facultad);
          setValue('correoInst', response.alumno.correoInst);

          setCursos(response.cursos);
        }
      }
    }
    loadAlumno();
  }, [id, setValue, getAlumnoPorId]);

  const onSubmit = handleSubmit(async (data) => {
    try {
        const cleanedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              typeof value === 'string' ? value.trim() : value
            ])
        );
    
        if (mode === 'edit' && id) {
          await updateAlumno(id, cleanedData);
          toast.success('Alumno editado con éxito');
        } else if (mode === 'create') {
          await createAlumno(cleanedData);
          toast.success('Alumno creado con éxito');
        }
        navigate('/listado-alumnos');

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
          error.response.data.errors.forEach((err) => {
              toast.error(err.message); // Muestra cada mensaje de error
          });
      } else {
          toast.error("Ha ocurrido un error en el servidor.");
      }
  }
  });

  return (
    <div className='flex items-center justify-center p-7 '>
      <div className='bg-white max-w-md w-full p-7 rounded-md relative'>
        <form onSubmit={onSubmit}>
            {/* Botón para cerrar formulario */}
            <button 
                className='absolute top-2 right-10 text-3xl hover:text-red-600' 
                onClick={() => navigate('/listado-alumnos')}>
                x
            </button>
            {/* Título */}
            <h1 className='text-3xl pb-2.5'>{titulos[mode]}</h1>

            {/* Parámetros del formulario */}
          <label htmlFor='nombreAlu'>Nombre:</label>
          <input
            type='text'
            placeholder='Nombre'
            {...register('nombreAlu')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            autoFocus
            readOnly={isReadOnly}
          />

          <label htmlFor='apellidoAlu'>Apellido:</label>
          <input
            type='text'
            placeholder='Apellido'
            {...register('apellidoAlu')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            readOnly={isReadOnly}
          />

          <label htmlFor='codigo'>Código:</label>
          <input
            type='text'
            placeholder='codigo'
            {...register('codigo')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            readOnly={isReadOnly}
          />

          <label htmlFor='dni'>DNI:</label>
          <input
            type='dni'
            placeholder='dni'
            {...register('dni')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            readOnly={isReadOnly}
          />

          <label htmlFor='facultad'>Facultad:</label>
          <input
            type='text'
            placeholder='Facultad'
            {...register('facultad')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            readOnly={isReadOnly}
          />

          <label htmlFor='correoInst'>Correo Institucional:</label>
          <input
            type='text'
            placeholder='Correo'
            {...register('correoInst')}
            className='w-full bg-gray-100 px-4 py-2 rounded-md my-2'
            readOnly={isReadOnly}
          />
            {/* Botón de Guardar para crear y editar views */}
          {mode !== 'view' && (
            <button className='bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2 rounded-md w-full mt-4'>Guardar</button>
          )}

          {/* Tabla Cursos Inscritos */}
          {cursos.length > 0 && <CursosTable cursos={cursos} />}
        </form>
      </div>
    </div>
  );
}

export default AlumnoForm;
