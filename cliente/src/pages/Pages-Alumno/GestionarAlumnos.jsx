import { useAlumno } from '../../context/AlumnoContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function GestionarAlumnos() {
  const { getAlumnos, alumnos, deleteAlumno } = useAlumno();
  const navigate = useNavigate();

  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <div>
      <div className='py-6 flex justify-between items-center'>
        <h1 className='text-3xl'>Lista de Alumnos</h1>
        <Link to='/agregar-alumno?mode=create' className='bg-green-800 w-60 py-3 rounded-sm text-xl font-bold text-center'>
          Agregar Alumno
        </Link>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300 text-slate-900'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-2 px-4 border-b'>Código</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Apellido</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno._id} className='text-center'>
                <td className='py-2 px-4 border-b'>{alumno.codigo}</td>
                <td className='py-2 px-4 border-b'>{alumno.nombreAlu}</td>
                <td className='py-2 px-4 border-b'>{alumno.apellidoAlu}</td>
                <td className='py-2 px-4 border-b flex justify-evenly'>
                  <button 
                    onClick={() => navigate(`/ver-alumno/${alumno._id}?mode=view`)} 
                    className='bg-green-600 text-white px-3 py-1 rounded'>
                    Ver
                  </button>
                  <button 
                    onClick={() => navigate(`/editar-alumno/${alumno._id}?mode=edit`)} 
                    className='bg-yellow-600 text-white px-3 py-1 rounded'>
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
                        deleteAlumno(alumno._id);
                        toast.success('Alumno eliminado con éxito');
                      }
                    }} 
                    className='bg-red-600 text-white px-3 py-1 rounded'
                  >
                    Eliminar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GestionarAlumnos;
