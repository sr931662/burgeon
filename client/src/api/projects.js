import axios from './axios';

export const fetchProjects = async (params = {}) => {
  const response = await axios.get('/projects', { params });
  return response.data;
};

export const fetchProjectBySlug = async (slug) => {
  const response = await axios.get(`/projects/slug/${slug}`);
  return response.data;
};

export const fetchFeaturedProjects = async (limit = 6) => {
  const response = await axios.get('/projects/featured', { params: { limit } });
  return response.data;
};

export const fetchProjectsByIndustry = async (industry, params = {}) => {
  const response = await axios.get(`/projects/industry/${industry}`, { params });
  return response.data;
};