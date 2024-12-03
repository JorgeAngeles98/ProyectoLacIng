import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import {createCursosRequest, 
    getCursosRequest, 
    deleteCursosRequest, 
    getCursoRequest, 
    updateCursosRequest, 
    matricularAlumnoRequest, 
    eliminarAlumnodeCursoRequest,
    asignarProfesorRequest,
    eliminarProfesordeCursoRequest,
    asignarSalonRequest,
    eliminarSalondeCursoRequest
 } from "../api/cursos";

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

    const actualizarCurso = async (id, curso) => {
        try{
            await updateCursosRequest(id, curso);
        }catch(error){
            console.error(error);
        }
            
    }

    const matricularAlumno = async (id, curso) => {
        try{
            const res = await matricularAlumnoRequest(id, curso);
            return res;
        }catch(error){
            throw error;
        } 
    }

    const eliminarAlumnodeCurso = async (id, curso) => {
        try{
            const res = await eliminarAlumnodeCursoRequest(id, curso);
            return res;
        }catch(error){
            throw error;
        } 
    }

    const asignarProfesor = async (id, curso) => {
        try{
            const res = await asignarProfesorRequest(id, curso);
            return res;
        }catch(error){
            throw error;
        } 
    }

    const eliminarProfesordeCurso = async (id, curso) => {
        try{
            const res = await eliminarProfesordeCursoRequest(id, curso);
            return res;
        }catch(error){
            throw error;
        } 
    }

    const asignarSalon = async (id, curso) => {
        try{
            const res = await asignarSalonRequest(id, curso);
            return res;
        }catch(error){
            throw error;
        } 
    }

    const eliminarSalondeCurso = async (id, curso) => {
        try{
            const res = await eliminarSalondeCursoRequest(id, curso);
            return res;
        }catch(error){
            throw error;
        } 
    }

    return (
        <CursoContext.Provider value={{ 
            cursos, 
            getCursos, 
            createCurso, 
            deleteCurso, 
            getCurso, 
            actualizarCurso,
            matricularAlumno,
            eliminarAlumnodeCurso,
            asignarProfesor,
            eliminarProfesordeCurso,
            asignarSalon,
            eliminarSalondeCurso
        }}>
            {children}
        </CursoContext.Provider>
    );
}

CursoProvider.propTypes = {
    children: PropTypes.node.isRequired,
}