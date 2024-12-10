import PropTypes from "prop-types";
import { usePc } from "../context/PcContext";
import { Link } from "react-router-dom";

function PCCard({ pc }) {
    const { deletePc } = usePc();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between'>
                <h1 className="text-2xl font-bold">{pc.nombre}</h1>
                <div className='flex flex-col gap-y-2 items-center'>
                    <Link to={`/registrar-pc/${pc._id}?mode=edit`}
                        className='bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md'
                    >   
                        Editar
                    </Link>
                    <Link to={`/registrar-pc/${pc._id}?mode=view`}
                        className='bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md'
                    >   
                        Ver
                    </Link>
                    <button className='bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            deletePc(pc._id);
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            </header>
            <p className="text-slate-300">Marca: {pc.marca}</p>
            <p className="text-slate-300">Serial: {pc.serial}</p>
            <p className="text-slate-300">Número de Patrimonio: {pc.numpatrimonio}</p>
            <p className="text-slate-300">Estado: {pc.estado}</p>
            <p className="text-slate-300">Observación: {pc.observacion}</p>
        </div>
    );
}

PCCard.propTypes = {
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

export default PCCard;