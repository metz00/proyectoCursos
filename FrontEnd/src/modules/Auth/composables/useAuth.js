import { useAppStore } from '@/store/app.js';
import axios from 'axios';

export const useAuth = () => {
  const appStore = useAppStore();

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");

    const { apiURL } = appStore;

    try {
      const response = await axios.get(`${apiURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      appStore.setUserData(response.data); 
      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      appStore.clearUserData();
      throw error;
    }
  };

  return {
    fetchUserData,
  };
};
