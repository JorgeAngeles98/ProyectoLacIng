import React, { useEffect, useState } from 'react';
import { useVisitante } from '../context/VisitanteContext';
import VisitantesForm from './VisitantesForm';
import VisitantesTable from '../components/VisitantesTable';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VAlumnoForm() {
    const { visitantes, getVisitantesByPc } = useVisitante();
    const { id: pcId } = useParams();
    const [updateTable, setUpdateTable] = useState(false);

    useEffect(() => {
        if (pcId) {
            getVisitantesByPc(pcId);
        }
    }, [pcId, getVisitantesByPc, updateTable]);

    const handleVisitanteAdded = () => {
        setUpdateTable(prev => !prev); // Forzar la actualización de la tabla
    };

    const handleVisitanteFinalizado = () => {
        setUpdateTable(prev => !prev); // Forzar la actualización de la tabla
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 pt-24">
                <VisitantesForm onVisitanteAdded={handleVisitanteAdded} />
            </div>
            <div className="w-1/2 p-20">
                <VisitantesTable onVisitanteFinalizado={handleVisitanteFinalizado} />
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default VAlumnoForm;