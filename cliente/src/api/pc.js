import axios from './axios';

export const getPcsRequest = 
() => axios.get('/pc');

export const createPcRequest = 
(pc) => axios.post("/pc", pc);

export const updatePcRequest = 
(id, pc) => axios.put(`/pc/${id}`, pc);

export const deletePcRequest = 
(id) => axios.delete(`/pc/${id}`);

export const getPcRequest = 
(id) => axios.get(`/pc/${id}`);

export const getPcsBySalonRequest = 
(id) => axios.get(`/pcsalon/${id}`);

export const getPcsBySalonOpInoRequest = 
(id) => axios.get(`/opino/${id}`);

export const countPcsBySalonOpInoRequest = 
(id) => axios.get(`/countopino/${id}`);

export const getPcsBySalonDDBRequest = 
(id) => axios.get(`/ddb/${id}`);

// Nuevas solicitudes
export const getPcsActivosRequest = 
() => axios.get('/pc-activos');

export const getPcsDDBRequest = 
() => axios.get('/pc-ddb');