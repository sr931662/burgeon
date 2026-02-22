import axios from './axios';

export const submitLead = async (data) => {
  const response = await axios.post('/leads', data);
  return response.data;
};