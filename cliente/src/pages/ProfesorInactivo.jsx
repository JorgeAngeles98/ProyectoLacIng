import { useProfesor } from "../context/ProfesorContext";
import { useEffect } from "react";
import ProfesorCard from "../components/ProfesorCard";
import { Link } from 'react-router-dom';
import { FaPlus, FaEye } from 'react-icons/fa';

function ProfesoresInactivos() {
    const { getProfesoresInactivos, profesores } = useProfesor();

    useEffect(() => {
        getProfesoresInactivos();
    }, []);

    return (
        <div>
            <div className="py-6 flex justify-center gap-4">
                <Link to='/profesor' className='bg-gray-700 hover:bg-gray-800 text-white w-2/3 py-3 rounded-sm text-2xl font-bold text-center flex items-center justify-center'>
                    <FaEye className="mr-2" /> Ver Activos
                </Link>
            </div>

            {profesores.length === 0 ? (
                <h1>No hay profesores inactivos</h1>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {profesores.map((profesor) => (
                        <ProfesorCard profesor={profesor} key={profesor._id} refreshProfesores={getProfesoresInactivos} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProfesoresInactivos;