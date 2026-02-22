import axios from './axios';

export const fetchTestimonials = async (params = {}) => {
  const response = await axios.get('/testimonials', { params });
  return response.data;
};

export const submitTestimonial = async (data) => {
  const response = await axios.post('/testimonials', data);
  return response.data;
};