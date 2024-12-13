import React, { useState } from 'react';
import { useVisitante } from '../context/VisitanteContext';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function VisitantesTable({ onVisitanteFinalizado }) {
    const { visitantes, finalizarVisitante, getVisitantesByPc } = useVisitante();
    const { id: pcId } = useParams(); // Obtener el ID de la PC desde los parámetros de la URL
    const [currentPage, setCurrentPage] = useState(1);
    const visitorsPerPage = 6;

    const handleFinalizar = async (id) => {
        await finalizarVisitante(id);
        toast.success('Visitante finalizado exitosamente.');
        onVisitanteFinalizado(); // Notificar al componente padre
    };

    // Ordenar los visitantes por la hora de inicio más reciente
    const sortedVisitantes = [...visitantes].sort((a, b) => new Date(b.horaInicio) - new Date(a.horaInicio));

    // Obtener los visitantes para la página actual
    const indexOfLastVisitor = currentPage * visitorsPerPage;
    const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
    const currentVisitors = sortedVisitantes.slice(indexOfFirstVisitor, indexOfLastVisitor);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Número total de páginas
    const totalPages = Math.ceil(sortedVisitantes.length / visitorsPerPage);

    return (
        <div className="mt-6">
            <h2 className="text-2xl mb-4">Visitantes</h2>
            {currentVisitors.length > 0 ? (
                <table className="min-w-full bg-white text-black">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Apellido</th>
                            <th className="px-4 py-2">Código</th>
                            <th className="px-4 py-2">Correo</th>
                            <th className="px-4 py-2">Actividad</th>
                            <th className="px-4 py-2">Hora de Inicio</th>
                            <th className="px-4 py-2">Hora de Salida</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(currentVisitors) && currentVisitors.map((visitante, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">{visitante.nombre}</td>
                                <td className="px-4 py-2">{visitante.apellido}</td>
                                <td className="px-4 py-2">{visitante.codigo}</td>
                                <td className="px-4 py-2">{visitante.correo}</td>
                                <td className="px-4 py-2">{visitante.actividad}</td>
                                <td className="px-4 py-2">{new Date(visitante.horaInicio).toLocaleString()}</td>
                                <td className="px-4 py-2">{visitante.horaSalida ? new Date(visitante.horaSalida).toLocaleString() : 'N/A'}</td>
                                <td className="px-4 py-2">{visitante.estado}</td>
                                <td className="px-4 py-2">
                                    {visitante.estado !== 'Finalizado' && (
                                        <button 
                                            className="text-green-500"
                                            onClick={() => handleFinalizar(visitante._id)}
                                        >
                                            <FaCheckCircle size={24} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-white">No hay visitantes registrados.</p>
            )}
            {totalPages > 1 && (
                <div className="flex justify-end mt-4 ml-96">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    <span className="px-3 py-1 mx-1 rounded bg-gray-300 text-black">
                        {currentPage}
                    </span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default VisitantesTable;