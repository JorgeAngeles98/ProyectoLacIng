import axios from './axios';

export const getListaAlumnosRequest = () => axios.get('/listar_alumnos');
export const getAlumnoRequest = (id) => axios.get(`/ver_alumno/${id}`);
export const getAlumnoPorCodigoRequest = (codigo) => axios.get(`/verificar_alumno/${codigo}`);
export const createAlumnoRequest = (alumno) => axios.post("/nuevo_alumno", alumno);
export const updateAlumnoRequest = (id, alumno) => axios.put(`/editar_alumno/${id}`, alumno);
export const deleteAlumnoRequest = (id) => axios.delete(`/borrar_alumno/${id}`);
