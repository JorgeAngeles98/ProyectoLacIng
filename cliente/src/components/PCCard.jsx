import PropTypes from "prop-types";
import { usePc } from "../context/PcContext";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';

function PCCard({ pc }) {
    const { updatePc, getPcsBySalon } = usePc();
    const [showModal, setShowModal] = useState(false);

    const handleDadoDeBaja = async () => {
        try {
            await updatePc(pc._id, { ...pc, estado: 'Dado de baja' });
            toast.success(`PC ${pc.nombre} - ${pc.serial} dada de baja con éxito`);
            setShowModal(false);
            await getPcsBySalon(pc.salon); // Actualiza la lista de PCs después de dar de baja
        } catch (error) {
            console.error("Error al dar de baja la PC", error);
            toast.error("Error al dar de baja la PC");
        }
    };

    return (
        <div className="bg-white max-w-md w-full p-10 rounded-md">
            <header className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold">{pc.nombre}</h1>
                <div className='flex gap-x-2'>
                    <Link to={`/registrar-pc/${pc._id}?mode=view`}
                        className='bg-green-700 hover:bg-green-800 text-white p-2 rounded-md flex items-center justify-center'
                    >   
                        <FaEye />
                    </Link>
                    {pc.estado !== 'Dado de baja' && (
                        <>
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
                        </>
                    )}
                </div>
            </header>
            <p className="text-slate-400">Estado: {pc.estado}</p>
            <p className="text-slate-400">Serial: {pc.serial}</p>
            <p className="text-slate-400">Número de Patrimonio: {pc.numpatrimonio}</p>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-md text-black">
                        <h2 className="text-xl font-bold mb-4">Confirmar Dado de Baja</h2>
                        <p>¿Seguro que quieres dar de baja el equipo {pc.nombre} - {pc.serial}?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md"
                                onClick={handleDadoDeBaja}
                            >
                                Dar de Baja
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
        salon: PropTypes.string.isRequired,
    }).isRequired,
};

export default PCCard;