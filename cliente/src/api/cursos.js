import axios from './axios';

export const getCursosRequest = 
() => axios.get('/curso');

export const createCursosRequest = 
(curso) => axios.post("/curso", curso);

export const updateCursosRequest = 
(id, curso) => axios.put(`/curso/${id}`, curso);

export const deleteCursosRequest = 
(id) => axios.delete(`/curso/${id}`);

export const getCursoRequest = 
(id) => axios.get(`/curso/${id}`);

export const matricularAlumnoRequest = 
(cursoId, alumnoId) => axios.post('/curso/matricular', { cursoId, alumnoId });

export const eliminarAlumnodeCursoRequest = 
(cursoId, alumnoId) => axios.post('/curso/eliminar-alumno', { cursoId, alumnoId });

export const asignarProfesorRequest = 
(cursoId, profesorId) => axios.post('/curso/asignar-profesor', { cursoId, profesorId });

export const eliminarProfesordeCursoRequest = 
(cursoId, profesorId) => axios.post('/curso/eliminar-profesor', { cursoId, profesorId });

export const asignarSalonRequest = 
(cursoId, salonId) => axios.post('/curso/asignar-salon', { cursoId, salonId });

export const eliminarSalondeCursoRequest = 
(cursoId, salonId) => axios.post('/curso/eliminar-salon', { cursoId, salonId });
