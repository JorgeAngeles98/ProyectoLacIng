import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
import { createAlumnoRequest, getListaAlumnosRequest, deleteAlumnoRequest, getAlumnoRequest, updateAlumnoRequest } from "../api/alumno";


const AlumnoContext = createContext();

export const useAlumno = () => {
    const context = useContext(AlumnoContext);

    if (!context) {
        throw new Error('useAlumno debe estar dentro del proveedor AlumnoContext');
    }
    return context;
}

export function AlumnoProvider({ children }) {

    const [alumnos, setAlumnos] = useState([]);

    const getAlumnos = async () => {
        try {
            const res = await getListaAlumnosRequest();
            setAlumnos(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createAlumno = async (alumno) => {
        try {
            const res = await createAlumnoRequest(alumno);
            return res;
        } catch (error) {
            throw error;
        }
    }

    const deleteAlumno = async (id) => {
        try {
            const res = await deleteAlumnoRequest(id);
            if (res.status === 204) setAlumnos(alumnos.filter(alumno => alumno._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const getAlumno = async (id) => {
        try {
            const res = await getAlumnoRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateAlumno = async (id, alumno) => {
        try {
            const res = await updateAlumnoRequest(id, alumno);
            return res;
        } catch (error) {
            throw error;
        }
    }

    return (
        <AlumnoContext.Provider value={{
            alumnos,
            createAlumno,
            getAlumnos,
            deleteAlumno,
            getAlumno,
            updateAlumno,
        }}>
            {children}
        </AlumnoContext.Provider>
    );
}

AlumnoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
