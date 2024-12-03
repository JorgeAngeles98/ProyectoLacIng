import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurso } from '../context/CursoContext'; // Contexto de cursos
import { useProfesor } from '../context/ProfesorContext'; // Contexto de profesores
import { useSalon } from '../context/SalonContext'; // Contexto de salones (nuevo)
import { toast } from 'react-toastify';

function CursoAsign() {
  const { id } = useParams(); // ID del curso
  const navigate = useNavigate();
  const { getCurso, asignarProfesor, eliminarProfesordeCurso, asignarSalon, eliminarSalondeCurso } = useCurso();
  const { getProfesores, profesores } = useProfesor();
  const { getSalones, salones } = useSalon(); // Manejo de salones
  const [curso, setCurso] = useState(null);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState('');
  const [salonSeleccionado, setSalonSeleccionado] = useState(''); // Nuevo estado para salón

  useEffect(() => {
    const loadDatos = async () => {
      try {
        const cursoData = await getCurso(id);
        if (cursoData) setCurso(cursoData);
        else toast.error('El curso no fue encontrado en la respuesta.');

        await getProfesores();
        await getSalones();
      } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.error('Hubo un problema al cargar los datos iniciales.');
      }
    };

    loadDatos();
  }, [asignarProfesor, eliminarProfesordeCurso, asignarSalon, eliminarSalondeCurso]);

  // Manejar la asignación o eliminación de profesor o salón
  const handleSubmit = async (e, action, tipo) => {
    e.preventDefault();

    try {
      let response;
      if (tipo === 'profesor') {
        if (action === 'asignar') {
          response = await asignarProfesor(id, profesorSeleccionado);
        } else if (action === 'eliminar') {
          response = await eliminarProfesordeCurso(id, profesorSeleccionado);
        }
      } else if (tipo === 'salon') {
        if (action === 'asignar') {
          response = await asignarSalon(id, salonSeleccionado);
        } else if (action === 'eliminar') {
          response = await eliminarSalondeCurso(id, salonSeleccionado);
        }
      }

      if (response && response.data && response.data.message) {
        toast.success(response.data.message);

        // Actualizar el curso después de la acción
        const updatedCurso = await getCurso(id);
        setCurso(updatedCurso);
      }

      // Limpiar selecciones
      if (tipo === 'profesor') setProfesorSeleccionado('');
      else if (tipo === 'salon') setSalonSeleccionado('');

    } catch (error) {
      console.error('Error al realizar la acción:', error);
      toast.error('Hubo un problema al procesar la solicitud.');
    }
  };

  return (
    <div className="container mx-auto p-4">
        {/* Título del curso */}
        {curso ? (
        <h1 className="text-3xl font-bold mb-4">
            {`Asignar Profesores y Salones: ${curso.nombre.toUpperCase()}`}
        </h1>
        ) : (
        <h1 className="text-3xl font-bold mb-4">Cargando información del curso...</h1>
        )}

      {/* Información del curso */}
        {curso && (
        <div className="border p-3 mb-6 rounded shadow">
            <h2 className="text-xl font-semibold pb-2">Información del curso:</h2>
            <p>
            <strong>Código:</strong> {curso.codigo}
            </p>
            
            {/* Salón */}
            <p>
            <strong>Salón:</strong>{' '}
            {curso.salon.length > 0 ? (
                curso.salon.map((s, index) => (
                <span key={index}>
                    {s.nombre}
                    {index < curso.salon.length - 1 && '; '}
                </span>
                ))
            ) : (
                <span>No hay salón asignado</span>
            )}
            </p>
            
            {/* Profesor */}
            <p>
            <strong>Profesor:</strong>{' '}
            {curso.profesor.length > 0 ? (
                curso.profesor.map((p, index) => (
                <span key={index}>
                    {p.nombre} {p.apellido}
                    {index < curso.profesor.length - 1 && '; '}
                </span>
                ))
            ) : (
                <span>No hay profesor asignado</span>
            )}
            </p>
        </div>
        )}


      {/* Formulario de selección de profesor */}
      <form className="mb-6 space-y-4">
        <div className="flex items-center space-x-3">
          <label htmlFor="profesor" className="text-lg">
            Seleccionar Profesor:
          </label>
          <select
            id="profesor"
            className="p-3 border border-gray-300 text-black rounded"
            value={profesorSeleccionado}
            onChange={(e) => setProfesorSeleccionado(e.target.value)}
          >
            <option value="">-- Selecciona un profesor --</option>
            {profesores.map((profesor) => (
              <option key={profesor._id} value={profesor._id}>
                {profesor.nombre} {profesor.apellido}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={!profesorSeleccionado}
            onClick={(e) => handleSubmit(e, 'asignar', 'profesor')}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
          >
            Asignar
          </button>

          <button
            type="button"
            disabled={!profesorSeleccionado}
            onClick={(e) => handleSubmit(e, 'eliminar', 'profesor')}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
          >
            Eliminar
          </button>
        </div>
      </form>

      {/* Formulario de selección de salón */}
      <form className="mb-6 space-y-4">
        <div className="flex items-center space-x-3">
          <label htmlFor="salon" className="text-lg">
            Seleccionar Salón:
          </label>
          <select
            id="salon"
            className="p-3 border border-gray-300 text-black rounded"
            value={salonSeleccionado}
            onChange={(e) => setSalonSeleccionado(e.target.value)}
          >
            <option value="">-- Selecciona un salón --</option>
            {salones.map((salon) => (
              <option key={salon._id} value={salon._id}>
                {salon.nombre}
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={!salonSeleccionado}
            onClick={(e) => handleSubmit(e, 'asignar', 'salon')}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
          >
            Asignar
          </button>

          <button
            type="button"
            disabled={!salonSeleccionado}
            onClick={(e) => handleSubmit(e, 'eliminar', 'salon')}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
          >
            Eliminar
          </button>
        </div>
      </form>

      {/* Botón de regreso */}
      <div className="mb-4">
        <button
          className="text-white bg-green-700 px-4 py-2 rounded hover:bg-gray-900"
          onClick={() => navigate('/curso')}
        >
          Volver a la lista de cursos
        </button>
      </div>
    </div>
  );
}

export default CursoAsign;
