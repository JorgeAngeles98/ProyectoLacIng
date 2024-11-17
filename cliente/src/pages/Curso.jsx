import { useCurso } from "../context/CursoContent";
import { useEffect } from "react";
import CursoCard from "../components/CursoCard";
import { Link } from 'react-router-dom';

function Curso(){
    const {getCursos, cursos} = useCurso();

    useEffect(() => {
        getCursos();
    }, []);

    if(cursos.length === 0) return (<h1>No hay cursos</h1>)

    return(
        <div>
            <div className="py-6 flex justify-center">
                <Link to='/agregar-curso' className='bg-indigo-500 w-full py-3 rounded-sm text-2xl font-bold text-center'>Agregar Curso</Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {cursos.map((curso) =>(
                    <CursoCard curso={curso} key={curso._id}/>
                ))}
            </div>
        </div>
    );

}

export default Curso;