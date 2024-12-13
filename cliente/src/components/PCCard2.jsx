import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';

function PCCard2({ pc }) {

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold">{pc.nombre}</h1>
                <div className='flex gap-x-2'>
                    <Link to={`/visitante-alumno/salon/pc/${pc._id}`}
                        className='bg-green-700 hover:bg-green-800 text-white p-2 rounded-md flex items-center justify-center'
                    >   
                        <FaPlus />
                    </Link>

                </div>
            </header>
        </div>
    );
}

PCCard2.propTypes = {
    pc: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        marca: PropTypes.string.isRequired,
        serial: PropTypes.string.isRequired,
        numpatrimonio: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        estado: PropTypes.string.isRequired,
        observacion: PropTypes.string,
    }).isRequired,
};

export default PCCard2;