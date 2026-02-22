import axios from './axios';

export const fetchClients = async (params = {}) => {
  const response = await axios.get('/clients', { params });
  return response.data;
};

export const fetchFeaturedClients = async (limit = 10) => {
  const response = await axios.get('/clients/featured', { params: { limit } });
  return response.data;
};

export const fetchClientsByIndustry = async (industry) => {
  const response = await axios.get(`/clients/industry/${industry}`);
  return response.data;
};