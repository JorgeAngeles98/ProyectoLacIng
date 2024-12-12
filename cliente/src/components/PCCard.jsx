import PropTypes from "prop-types";
import { usePc } from "../context/PcContext";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

function PCCard({ pc }) {
    const { deletePc } = usePc();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        deletePc(pc._id);
        setShowModal(false);
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold">{pc.nombre}</h1>
                <div className='flex gap-x-2'>
                    <Link to={`/registrar-pc/${pc._id}?mode=view`}
                        className='bg-green-700 hover:bg-green-800 text-white p-2 rounded-md flex items-center justify-center'
                    >   
                        <FaEye />
                    </Link>
                    <Link to={`/registrar-pc/${pc._id}?mode=edit`}
                        className='bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-md flex items-center justify-center'
                    >   
                        <FaEdit />
                    </Link>
                    <button className='bg-red-700 hover:bg-red-900 text-white p-2 rounded-md flex items-center justify-center'
                        onClick={() => setShowModal(true)}
                    >
                        <FaTrash />
                    </button>
                </div>
            </header>
            <p className="text-slate-300">Estado: {pc.estado}</p>
            <p className="text-slate-300">Observación: {pc.observacion}</p>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md text-black">
                        <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que deseas eliminar la {pc.nombre}?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
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