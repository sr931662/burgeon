import axios from './axios';

export const fetchProducts = async (params = {}) => {
  const response = await axios.get('/products', { params });
  return response.data;
};

export const fetchProductBySlug = async (slug) => {
  const response = await axios.get(`/products/slug/${slug}`);
  return response.data;
};

export const fetchProductsByCategory = async (category, params = {}) => {
  const response = await axios.get(`/products/category/${category}`, { params });
  return response.data;
};