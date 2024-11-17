import axios from './axios';

export const getProfesoresRequest = 
() => axios.get('/profesor');

export const createProfesorRequest = 
(profesor) => axios.post("/profesor", profesor);

export const updateProfesorRequest = 
(id, profesor) => axios.put(`/profesor/${id}`, profesor);

export const deleteProfesorRequest = 
(id) => axios.delete(`/profesor/${id}`);

export const getProfesorRequest = 
(id) => axios.get(`/profesor/${id}`);
