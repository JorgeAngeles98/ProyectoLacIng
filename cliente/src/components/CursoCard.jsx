import PropTypes from "prop-types";
import { useCurso } from "../context/CursoContext";
import { Link } from "react-router-dom";

function CursoCard({ curso }) {
    const { deleteCurso } = useCurso();

    return (
        <div className="bg-white max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between'>
                <h1 className="text-2xl font-bold">{curso.nombre}</h1>
                <div className='flex flex-col gap-y-2 items-center'>
                    <Link to={`/curso/${curso._id}`}
                        className='bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md'
                    >   
                        Editar
                    </Link>
                    <Link to={`/curso/asignar/${curso._id}`}
                        className='bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md'
                    >   
                        Asignar
                    </Link>
                    <button className='bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deleteCurso(curso._id);
                        }}
                    >
                        Eliminar
                    </button>
                </div>

            </header>
            <p className="text-black">{curso.codigo}</p>
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