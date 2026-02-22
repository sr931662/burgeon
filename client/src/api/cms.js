import axios from './axios';

export const fetchCMSPage = async (slug) => {
  const response = await axios.get(`/cms/${slug}`);
  return response.data;
};