import axios from './axios';

// Services API
export const fetchServices = async (params = {}) => {
  const response = await axios.get('/services', { params });
  return response.data;
};

export const fetchServiceBySlug = async (slug) => {
  const response = await axios.get(`/services/slug/${slug}`);
  return response.data;
};