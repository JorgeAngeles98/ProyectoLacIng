import PropTypes from "prop-types";
import { useProfesor } from "../context/ProfesorContext";
import { Link } from "react-router-dom";
import { FaEdit, FaEyeSlash, FaCheck } from 'react-icons/fa';
import React, { useState } from 'react';

function ProfesorCard({ profesor, refreshProfesores }) {
    const { updateProfesor } = useProfesor();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleActivate = async () => {
        await updateProfesor(profesor._id, { ...profesor, estado: "Activo" });
        refreshProfesores();
    };

    const handleDeactivate = async () => {
        await updateProfesor(profesor._id, { ...profesor, estado: "Inactivo" });
        setModalIsOpen(false);
        refreshProfesores();
    };

    return (
        <div className="bg-white max-w-md w-full p-10 rounded-md relative">
            <header className='flex justify-between items-start'>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{profesor.nombre} {profesor.apellido}</h1>
                </div>
                <div className='flex gap-x-2 items-center pr-2'>
                    {profesor.estado === "Activo" ? (
                        <>
                            <Link to={`/profesor/${profesor._id}`}
                                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center'
                            >
                                <FaEdit />
                            </Link>
                            <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center'
                                onClick={() => setModalIsOpen(true)}
                            >
                                <FaEyeSlash />
                            </button>
                        </>
                    ) : (
                        <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center'
                            onClick={handleActivate}
                        >
                            <FaCheck />
                        </button>
                    )}
                </div>
            </header>
            <p className="text-black">{profesor.codigo}</p>
            <p>{profesor.correo}</p>

            {modalIsOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Confirmar Desactivación</h2>
                        <p>¿Estás seguro de que quieres desactivar a {profesor.nombre} {profesor.apellido} - {profesor.codigo}?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                onClick={() => setModalIsOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={handleDeactivate}
                            >
                                Desactivar
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
        estado: PropTypes.string.isRequired,
    }).isRequired,
    refreshProfesores: PropTypes.func.isRequired,
};

export default ProfesorCard;