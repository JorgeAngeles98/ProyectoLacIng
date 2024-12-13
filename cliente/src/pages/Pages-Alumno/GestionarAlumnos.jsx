import { useAlumno } from '../../context/AlumnoContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChevronDownIcon, PencilIcon, TrashIcon, EyeIcon, ClipboardIcon } from '@heroicons/react/24/solid'; // Ajusta según tus íconos disponibles.
import { Menu } from '@headlessui/react';

function GestionarAlumnos() {
  const { getAlumnos, alumnos, deleteAlumno } = useAlumno();
  const navigate = useNavigate();

  useEffect(() => {
    getAlumnos();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      deleteAlumno(id);
      toast.success('Alumno eliminado con éxito');
    }
  };

  const handleNavigate = (id, mode) => {
    if(mode){
      navigate(`/form-alumno/${id}?mode=${mode}`);
    } 
    else navigate(`/matricular-alumno/${id}`)
  };

  return (
    <div>
      <div className="py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lista de Alumnos</h1>
        <Link
          to="/form-alumno?mode=create"
          className="bg-emerald-700 hover:bg-emerald-800 w-60 py-3 rounded-lg text-xl font-bold text-center text-white"
        >
          Agregar Alumno
        </Link>
      </div>

      <div className="relative overflow-visible">
        <table className="min-w-full bg-white border border-gray-300 text-slate-900">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="py-2 px-4 border-b">Código</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Apellido</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno._id} className="text-center">
                <td className="py-2 px-4 border-b">{alumno.codigo}</td>
                <td className="py-2 px-4 border-b">{alumno.nombreAlu}</td>
                <td className="py-2 px-4 border-b">{alumno.apellidoAlu}</td>
                <td className="py-2 px-4 border-b">

                  {/* 
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner hover:bg-gray-800 focus:outline-none">
                      Opciones
                      <ChevronDownIcon className="h-5 w-5 text-white/60" />
                    </Menu.Button>
                    <Menu.Items className="absolute z-50 mt-2 w-52 origin-top-right rounded-xl border border-gray-300 bg-white shadow-lg">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                          onClick={() => handleNavigate(alumno._id, 'view')}
                            className={`group flex w-full items-center gap-2 py-1.5 px-3 rounded-lg ${
                              active ? 'bg-gray-100' : ''
                            }`}
                          >
                            <EyeIcon className="h-5 w-5 text-gray-600" />
                            Ver
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleNavigate(alumno._id, 'edit')}
                            className={`group flex w-full items-center gap-2 py-1.5 px-3 rounded-lg ${
                              active ? 'bg-gray-100' : ''
                            }`}
                          >
                            <PencilIcon className="h-5 w-5 text-gray-600" />
                            Editar
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleNavigate(alumno._id)}
                            className={`group flex w-full items-center gap-2 py-1.5 px-3 rounded-lg ${
                              active ? 'bg-gray-100' : ''
                            }`}
                          >
                            <ClipboardIcon className="h-5 w-5 text-gray-600" />
                            Matricular a curso
                          </button>
                        )}
                      </Menu.Item>
                      <div className="my-1 h-px bg-gray-300" />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleDelete(alumno._id)}
                            className={`group flex w-full items-center gap-2 py-1.5 px-3 rounded-lg ${
                              active ? 'bg-gray-100' : ''
                            }`}
                          >
                            <TrashIcon className="h-5 w-5 text-red-600" />
                            Eliminar
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                  */}
                
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleNavigate(alumno._id, 'view')}
                      className="inline-flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-800 py-1 px-1 text-white shadow-inner focus:outline-none"
                    >
                      <EyeIcon className="h-5 w-5 text-white/60" />
                    </button>

                    <button
                      onClick={() => handleNavigate(alumno._id, 'edit')}
                      className="inline-flex items-center justify-center rounded-md bg-amber-500 hover:bg-amber-600 py-1 px-1 text-white shadow-inner focus:outline-none"
                    >
                      <PencilIcon className="h-5 w-5 text-white/60" />
                    </button>

                    <button
                      onClick={() => handleNavigate(alumno._id)}
                      className="inline-flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-800  py-1 px-1 text-white shadow-inner focus:outline-none"
                    >
                      <ClipboardIcon className="h-5 w-5 text-white/60" />
                    </button>

                    <button
                      onClick={() => handleDelete(alumno._id)}
                      className="inline-flex items-center justify-center rounded-md bg-red-600 py-1 px-1 text-white shadow-inner hover:bg-red-700 focus:outline-none"
                    >
                      <TrashIcon className="h-5 w-5 text-white/60" />
                    </button>
                  </div>


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
