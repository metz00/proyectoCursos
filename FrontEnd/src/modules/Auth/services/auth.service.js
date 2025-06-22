import axios from "axios";
import { useAppStore } from "@/store/app";
import alerts from "@/shared/alerts";

export const signIn = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${useAppStore().$state.apiURL}/auths/local/sign-in`,
      { email, password }
    );
    if (data.error) throw new Error(data.message);
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Ocurrió un error inesperado";

    alerts.showError(message);
  }
};
export const signUp = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${useAppStore().$state.apiURL}/auths/local/sign-up`,
      { email, password }
    );
    if (data.error) throw new Error(data.message);
    return data;
  } catch (error) {
    const message = error.message || "Ocurrió un error inesperado";
    alerts.showError(message);
  }
};
