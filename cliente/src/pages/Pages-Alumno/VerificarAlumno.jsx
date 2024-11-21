import { useState } from 'react';
import { useAlumno } from '../../context/AlumnoContext';
import { toast } from 'react-toastify';

function VerificarAlumno() {
    const { getAlumnoPorCodigo } = useAlumno();
    const [searchCodigo, setSearchCodigo] = useState(''); // Input del usuario
    const [alumnoData, setAlumnoData] = useState(null); // Datos del alumno encontrados
    const [cursoData, setCursoData] = useState(null); // Datos de cursos encontrados
  
    const handleSearch = async () => {
      if (!searchCodigo.trim()) {
        toast.error('Por favor, ingrese un código válido.');
        setAlumnoData(null);
        setCursoData(null);
        return;
      }
  
      try {
        const response = await getAlumnoPorCodigo(searchCodigo);
        if (response) {
          setAlumnoData(response); // Guarda los datos del alumno
          console.log(response);
          setCursoData(response.cursos);
          toast.success('Alumno encontrado con éxito.');
        } else {
          toast.error('No se encontró un alumno con ese código.');
          setAlumnoData(null);
          setCursoData(null);
        }
      } catch (error) {
        console.error('Error al buscar el alumno:', error);
        toast.error('Hubo un error al buscar el alumno.');
      }
    };

  return (
    <div>

      {/* Título y Sección de búsqueda */}
      <div className='py-6 mb-6'>
        <h2 className='text-2xl mb-4'>Buscar Alumno</h2>
        <div className='flex items-center gap-4'>
          <input
            type='text'
            placeholder='Ingrese código de alumno'
            value={searchCodigo}
            onChange={(e) => setSearchCodigo(e.target.value)}
            className='rounded-lg px-4 py-2 w-64 text-black'
          />
          <button
            onClick={handleSearch}
            className='bg-green-700 text-white px-6 py-2 rounded'
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Detalles del alumno encontrado */}
      {alumnoData && (
        <div>
            <h3 className='text-xl font-bold mb-2'>Detalles de Alumno</h3>
            <div className='bg-gray-100 p-4 mb-6 text-black'>
                <p><strong>Código:</strong> {alumnoData.alumno.codigo}</p>
                <p><strong>Nombre:</strong> {alumnoData.alumno.nombreAlu}</p>
                <p><strong>Apellido:</strong> {alumnoData.alumno.apellidoAlu}</p>
                <p><strong>Correo:</strong> {alumnoData.alumno.correoInst}</p> 
                <p><strong>Facultad:</strong> {alumnoData.alumno.facultad}</p>
            </div>
        </div>
        
      )}
      
        {cursoData && (
            <div className='overflow-x-auto'>   
                <h4 className='text-xl font-bold mt-4 mb-2'>Cursos</h4>
                <table className='min-w-full bg-white border border-gray-300 text-slate-900'>
                <thead>
                    <tr className='bg-gray-100'>
                    <th className='py-2 px-4 border-b'>Curso</th>
                    <th className='py-2 px-4 border-b'>Salón</th>
                    <th className='py-2 px-4 border-b'>Docente</th>
                    </tr>
                </thead>
                <tbody>
                    {cursoData.map((curso) => (
                    <tr key={curso._id} className='text-center'>
                        <td className='py-2 px-4 border-b text-left'>{curso.nombre}</td>
                        <td className='py-2 px-4 border-b'>{curso.salon[0]?.nombre } </td>
                        <td className='py-2 px-4 border-b text-left'>
                        {curso.profesor ? `${curso.profesor.apellido}, ${curso.profesor.nombre}` : 'No asignado'}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
    </div>
  );
}

export default VerificarAlumno;
