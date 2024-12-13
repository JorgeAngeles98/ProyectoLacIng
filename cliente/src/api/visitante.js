import axios from './axios';

export const getVisitantesRequest = 
() => axios.get('/visitante');

export const createVisitanteRequest = 
(visitante) => axios.post("/visitante", visitante);

export const updateVisitanteRequest = 
(id, visitante) => axios.put(`/visitante/${id}`, visitante);

export const deleteVisitanteRequest = 
(id) => axios.delete(`/visitante/${id}`);

export const getVisitanteRequest = 
(id) => axios.get(`/visitante/${id}`);

export const getVisitantesByPcRequest = 
(id) => axios.get(`/visitante/pc/${id}`);