import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import {createCursosRequest, getCursosRequest, deleteCursosRequest, getCursoRequest, updateCursosRequest } from "../api/cursos";

const CursoContext = createContext();

export const useCurso = () => {
    const context = useContext(CursoContext);

    if (!context) {
        throw new Error('useCurso debe estar dentro del proveedor CursoContext');
    }
    return context;
}

export function CursoProvider({children}){

    const [cursos, setCursos] = useState([]);

    const getCursos = async () => {
        try {
            const res = await getCursosRequest();
            setCursos(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createCurso = async (curso) => {
        const res = await createCursosRequest(curso);
        console.log(res);
    }

    const deleteCurso = async (id) => {
        try {
            const res = await deleteCursosRequest(id);
            if (res.status === 204) setCursos(cursos.filter(curso => curso._id !== id));

        } catch (error) {
            console.error(error);
        }
    }

    const getCurso = async (id) => {
        try {
            const res = await getCursoRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const actuzaliarCurso = async (id, curso) => {
        try{
            await updateCursosRequest(id, curso);
        }catch(error){
            console.error(error);
        }
            
    }

    return (
        <CursoContext.Provider value={{ 
            cursos, 
            getCursos, 
            createCurso, 
            deleteCurso, 
            getCurso, 
            actuzaliarCurso 
        }}>
            {children}
        </CursoContext.Provider>
    );
}

CursoProvider.propTypes = {
    children: PropTypes.node.isRequired,
}