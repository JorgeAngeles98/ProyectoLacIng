import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurso } from '../../context/CursoContext';
import { useAlumno } from '../../context/AlumnoContext';
import { toast } from 'react-toastify';
import CursosTable from '../../components/CursosTable';

function MatricularAlumno() {
  const { id } = useParams(); // ID del alumno
  const navigate = useNavigate();
  const { getCursos, cursos, matricularAlumno, eliminarAlumnodeCurso } = useCurso();
  const { getAlumnoPorId } = useAlumno();
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [cursosDelAlumno, setCursosDelAlumno] = useState([]);

  useEffect(() => {
    if (cursos.length === 0) {
      getCursos();
    }

    const loadAlumno = async () => {
      try {
        const response = await getAlumnoPorId(id);
        if (response && response.alumno) {
          setCursosDelAlumno(response.cursos || []);
        }
      } catch (error) {
        toast.error('Error al obtener los datos del alumno.');
      }
    };

    loadAlumno();
  }, [id, cursos, getCursos, getAlumnoPorId]);

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    console.log('Acción:', action); // Verifica si está llegando al botón de eliminar
    
    try {
      let response;
      
      if (action === 'matricular') {
        response = await matricularAlumno(cursoSeleccionado, id);
      } else if (action === 'eliminar') {
        console.log('Eliminando alumno del curso'); // Verifica si entra en esta sección
        response = await eliminarAlumnodeCurso(cursoSeleccionado, id);
        console.log('Respuesta de eliminar:', response.data);  // Verifica si llega una respuesta del backend
      }
  
      if (response && response.data && response.data.message) {
        toast.success(response.data.message);
      }
  
      const updatedAlumno = await getAlumnoPorId(id);
      setCursosDelAlumno(updatedAlumno.cursos || []);
  
    } catch (error) {
      console.error('Error en la eliminación:', error);  // Agrega este log para detectar errores
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 mt-2">Asignar Alumno</h1>

      <div className="relative mb-6">
        {/* Botón para cerrar */}
        <button
          className="absolute right-0 text-2xl hover:text-red-600"
          onClick={() => navigate('/listado-alumnos')}
        >
          x
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selección de curso */}
        <div className="mb-4">
          <label htmlFor="curso" className="text-2xl">
            Seleccionar Curso:
          </label>
          <div className="flex mt-2 space-x-3 items-center align">
            <select
              id="curso"
              className="text-black p-2 border border-gray-300 rounded"
              value={cursoSeleccionado}
              onChange={(e) => setCursoSeleccionado(e.target.value)}
            >
              <option value="">-- Selecciona un curso --</option>
              {cursos.map((curso) => (
                <option key={curso._id} value={curso._id}>
                  {curso.nombre} - {curso.codigo}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={!cursoSeleccionado}
              onClick={(e) => handleSubmit(e, 'matricular')} // Matricular
              className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
            >
              Asignar
            </button>

            {/* Botón para eliminar */}
            <button
              type="button"
              disabled={!cursoSeleccionado}
              onClick={(e) => handleSubmit(e, 'eliminar')} // Eliminar
              className="bg-red-600 text-white px-4 py-2 rounded disabled:bg-gray-700"
            >
              Eliminar
            </button>
          </div>
        </div>

        {/* Tabla cursos inscritos */}
        <div>
          {cursosDelAlumno && (
            <CursosTable cursos={cursosDelAlumno} />
          )}
        </div>
      </form>
    </div>
  );
}

export default MatricularAlumno;
