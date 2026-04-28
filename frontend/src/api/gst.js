import api from './axiosInstance.js';

export const fetchGSTData = (gstin) => api.get(`/gst-data/${gstin}`);
export const fetchGSTFiling = (gstin) => api.get(`/gst-filing/${gstin}`);
