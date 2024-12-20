import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { 
    createProfesorRequest, 
    getProfesoresRequest, 
    deleteProfesorRequest, 
    getProfesorRequest, 
    updateProfesorRequest,
    getProfesoresActivosRequest,
    getProfesoresInactivosRequest
} from "../api/profesores";

const ProfesorContext = createContext();

export const useProfesor = () => {
    const context = useContext(ProfesorContext);

    if (!context) {
        throw new Error('useProfesor debe estar dentro del proveedor ProfesorContext');
    }
    return context;
}

export function ProfesorProvider({children}){

    const [profesores, setProfesores] = useState([]);

    const getProfesores = async () => {
        try {
            const res = await getProfesoresRequest();
            setProfesores(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getProfesoresActivos = async () => {
        try {
            const res = await getProfesoresActivosRequest();
            setProfesores(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getProfesoresInactivos = async () => {
        try {
            const res = await getProfesoresInactivosRequest();
            setProfesores(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createProfesor = async (profesor) => {
        const res = await createProfesorRequest(profesor);
        console.log(res);
    }

    const deleteProfesor = async (id) => {
        try {
            const res = await deleteProfesorRequest(id);
            if (res.status === 204) setProfesores(profesores.filter(profesor => profesor._id !== id));

        } catch (error) {
            console.error(error);
        }
    }

    const getProfesor = async (id) => {
        try {
            const res = await getProfesorRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateProfesor = async (id, profesor) => {
        try{
            await updateProfesorRequest(id, profesor);
        }catch(error){
            console.error(error);
        }
            
    }

    return (
        <ProfesorContext.Provider value={{ 
            profesores, 
            getProfesores, 
            getProfesoresActivos,
            getProfesoresInactivos,
            createProfesor, 
            deleteProfesor, 
            getProfesor, 
            updateProfesor,
            getProfesoresRequest
        }}>
            {children}
        </ProfesorContext.Provider>
    );
}

ProfesorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}