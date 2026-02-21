import { AxiosError } from "axios";
import { apiRoutes } from "../routes";
import api from "../axios.instance";
import type { TBaseUser } from "../../types";

// REGISTER API
export const register_user = async (data: FormData) => {
  try {
    const { method, url } = apiRoutes.auth.register;
    const response = await api.request({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If it's an Axios error
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// LOGIN API
export const login_user = async (
  data: Pick<TBaseUser, "email" | "password">,
) => {
  try {
    const { method, url } = apiRoutes.auth.login;
    const response = await api.request({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If it's an Axios error
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};
