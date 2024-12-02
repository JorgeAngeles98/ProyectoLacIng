import PropTypes from "prop-types";
import { useProfesor } from "../context/ProfesorContent";
import { Link } from "react-router-dom";

function ProfesorCard({ profesor }) {
    const { deleteProfesor } = useProfesor();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between'>
                <h1 className="text-2xl font-bold">{profesor.nombre} {profesor.apellido}</h1>
                <div className='flex gap-x-2 items-center'>
                    <Link to={`/profesor/${profesor._id}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Editar</Link>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deleteProfesor(profesor._id);
                        }}>Eliminar</button>
                </div>
            </header>
            <p className="text-slate-300">{profesor.codigo}</p>
            <p>{profesor.correo}</p>
        </div>
    )
}

ProfesorCard.propTypes = {
    profesor: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        apellido: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        correo: PropTypes.string.isRequired,
    }).isRequired,
};
export default ProfesorCard;