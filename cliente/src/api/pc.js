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
