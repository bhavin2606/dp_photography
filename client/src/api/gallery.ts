import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchGallery = async () => {
  const response = await axios.get(`${API_BASE_URL}/gallery`);
  return response.data;
};

