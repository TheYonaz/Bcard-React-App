import axios from "axios";
import UserType, {
  Login,
  UserRegistered,
  NormalizedEditUser,
} from "../models/types/userType";
import Userinterface from "../models/interfaces/UserInterface";
import UserEditInterface from "../models/interfaces/UserEditInterface";
import { useSnack } from "../../providers/SnackbarProvider";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user: Login) => {
  const attempts = localStorage.getItem("loginAttempts");
  const numAttempts = attempts ? parseInt(attempts) : 0;
  const remainingTime = localStorage.getItem("remainingTime");

  if (numAttempts >= 3 || remainingTime) {
    if (remainingTime && parseInt(remainingTime) > Date.now()) {
      const timeUntilReset = Math.ceil(parseInt(remainingTime) - Date.now());
      if (timeUntilReset > 0) {
        const hours = Math.floor(timeUntilReset / (60 * 60 * 1000))
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((timeUntilReset / (60 * 1000)) % 60)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor((timeUntilReset / 1000) % 60)
          .toString()
          .padStart(2, "0");
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        localStorage.removeItem("loginAttempts");
        return Promise.reject(
          `You have reached the maximum login attempts. Please try again after ${formattedTime} seconds.`
        );
      }
    }
  }

  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("loginAttempts");
    return data;
  } catch (error) {
    const updatedAttempts = numAttempts + 1;
    localStorage.setItem("loginAttempts", updatedAttempts.toString());

    if (updatedAttempts === 3) {
      const resetTime = Date.now() + 86400 * 1000;
      localStorage.setItem("remainingTime", resetTime.toString());
      const timeUntilReset = Math.ceil((resetTime - Date.now()) / 1000);
      return Promise.reject(
        `You have reached the maximum login attempts. Please try again after ${timeUntilReset} seconds.`
      );
    }

    if (axios.isAxiosError(error)) {
      return Promise.reject(error.message);
    }

    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const EditUser = async (userNormalized: NormalizedEditUser) => {
  try {
    const serverUser = { ...userNormalized };
    const { _id } = serverUser;
    delete serverUser._id;
    const { data } = await axios.put<UserEditInterface>(
      `${apiUrl}/users/${_id}`,
      serverUser
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
export const GetUser = async (userId: string) => {
  try {
    const { data } = await axios.get<UserEditInterface>(
      `${apiUrl}/users/${userId}`
    );
    console.log(data);
    if (data) return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error))
      return Promise.reject("An unexpected error occurred!");
  }
};
export const GetUsers = async (userId: string) => {
  try {
    const { data } = await axios.get<UserEditInterface>(`${apiUrl}/users/`);
    console.log(data);
    if (data) return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error))
      return Promise.reject("An unexpected error occurred!");
  }
};
