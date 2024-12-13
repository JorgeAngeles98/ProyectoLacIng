import { useCurso } from "../context/CursoContext";
import { useEffect } from "react";
import CursoCard from "../components/CursoCard";
import { Link } from 'react-router-dom';

function Curso(){
    const {getCursos, cursos} = useCurso();

    useEffect(() => {
        getCursos();
    }, []);

    return (
        <div>
            <div className="py-6 flex justify-center">
                <Link to='/agregar-curso' className='bg-emerald-700 hover:bg-emerald-800 text-white w-full py-3 rounded-sm text-2xl font-bold text-center'>
                    Agregar Curso
                </Link>
            </div>
    
            {cursos.length === 0 ? (
                <h1>No hay cursos</h1>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {cursos.map((curso) => (
                        <CursoCard curso={curso} key={curso._id} />
                    ))}
                </div>
            )}
        </div>
    );

}

export default Curso;