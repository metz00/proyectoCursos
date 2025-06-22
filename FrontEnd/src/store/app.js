// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    apiURL: `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_APP_PORT}/api/v1`,
    imgURL: `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_APP_PORT}/`,
     userData: null,
  }),
  actions: {
    setUserData(data) {
      this.userData = data;
    },
    clearUserData() {
      this.userData = null;
    }
  }
})
