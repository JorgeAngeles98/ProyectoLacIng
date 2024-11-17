import axios from './axios';

export const getSalonesRequest = 
() => axios.get('/salon');

export const createSalonesRequest = 
(salon) => axios.post("/salon", salon);

export const updateSalonesRequest = 
(id, salon) => axios.put(`/salon/${id}`, salon);

export const deleteSalonesRequest = 
(id) => axios.delete(`/salon/${id}`);

export const getSalonRequest = 
(id) => axios.get(`/salon/${id}`);
