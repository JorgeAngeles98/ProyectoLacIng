import { useProfesor } from "../context/ProfesorContent";
import { useEffect } from "react";
import ProfesorCard from "../components/ProfesorCard";
import { Link } from 'react-router-dom';

function Profesor() {
    const { getProfesores, profesores } = useProfesor();

    useEffect(() => {
        getProfesores();
    }, []);

    return (
        <div>
            <div className="py-6 flex justify-center">
                <Link to='/agregar-profesor' className='bg-indigo-500 w-full py-3 rounded-sm text-2xl font-bold text-center'>
                    Agregar Profesor
                </Link>
            </div>

            {profesores.length === 0 ? (
                <h1>No hay profesores</h1>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {profesores.map((profesor) => (
                        <ProfesorCard profesor={profesor} key={profesor._id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profesor;
