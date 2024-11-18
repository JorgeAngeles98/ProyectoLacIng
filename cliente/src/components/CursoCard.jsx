import PropTypes from "prop-types";
import { useCurso } from "../context/CursoContent";
import { Link } from "react-router-dom";

function CursoCard({ curso }) {
    const { deleteCurso } = useCurso();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between'>
                <h1 className="text-2xl font-bold">{curso.nombre}</h1>
                <div className='flex gap-x-2 items-center'>
                    <Link to={`/curso/${curso._id}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Editar</Link>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deleteCurso(curso._id);
                        }}>Eliminar</button>
                </div>
            </header>
            <p className="text-slate-300">{curso.codigo}</p>
            <p>{new Date(curso.dateinicio).toLocaleDateString()}</p>
        </div>
    )
}

CursoCard.propTypes = {
    curso: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        carrera: PropTypes.string.isRequired,
        dateinicio: PropTypes.string.isRequired,
    }).isRequired,
};
export default CursoCard;