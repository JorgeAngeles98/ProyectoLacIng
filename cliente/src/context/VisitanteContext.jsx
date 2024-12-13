import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { 
    createVisitanteRequest, 
    getVisitantesRequest, 
    deleteVisitanteRequest, 
    getVisitanteRequest, 
    updateVisitanteRequest,
    getVisitantesByPcRequest
} from "../api/visitante";

const VisitanteContext = createContext();

export const useVisitante = () => {
    const context = useContext(VisitanteContext);

    if (!context) {
        throw new Error('useVisitante debe estar dentro del proveedor VisitanteContext');
    }
    return context;
}

export function VisitanteProvider({ children }) {
    const [visitantes, setVisitantes] = useState([]);

    const getVisitantes = useCallback(async () => {
        try {
            const res = await getVisitantesRequest();
            setVisitantes(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getVisitantesByPc = useCallback(async (id) => {
        try {
            const res = await getVisitantesByPcRequest(id);
            setVisitantes(res.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const createVisitante = async (visitante) => {
        try {
            const res = await createVisitanteRequest(visitante);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteVisitante = async (id) => {
        try {
            const res = await deleteVisitanteRequest(id);
            if (res.status === 204) setVisitantes(visitantes.filter(visitante => visitante._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const getVisitante = async (id) => {
        try {
            const res = await getVisitanteRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateVisitante = async (id, visitante) => {
        try {
            await updateVisitanteRequest(id, visitante);
        } catch (error) {
            console.error(error);
        }
    };

    const finalizarVisitante = async (id) => {
        try {
            const res = await updateVisitanteRequest(id, { estado: 'Finalizado', horaSalida: new Date() });
            setVisitantes(visitantes.map(visitante => visitante._id === id ? res.data : visitante));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <VisitanteContext.Provider value={{ 
            visitantes, 
            getVisitantes, 
            getVisitantesByPc, 
            createVisitante, 
            deleteVisitante, 
            getVisitante, 
            updateVisitante,
            finalizarVisitante 
        }}>
            {children}
        </VisitanteContext.Provider>
    );
}

VisitanteProvider.propTypes = {
    children: PropTypes.node.isRequired,
}