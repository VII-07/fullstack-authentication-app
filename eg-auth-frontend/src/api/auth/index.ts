import axios, { AxiosInstance } from "axios";
import { AuthResponse, LoginData, SignupData } from "../../utils/interface";

export const baseURL = process.env.REACT_APP_BASE_URL;
const instance: AxiosInstance = axios.create({ baseURL });

export const userLogin = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await instance.post<AuthResponse>("auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login request failed");
    }
    throw new Error("An unknown error occurred during login.");
  }
};

export const signUpUser = async (data: SignupData) => {
  try {
    const response = await instance.post("auth/signup", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Signup request failed");
    }
    throw new Error("An unknown error occurred during signup.");
  }
};
