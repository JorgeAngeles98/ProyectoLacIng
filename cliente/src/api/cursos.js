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
