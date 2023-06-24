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
  const attempts = localStorage.getItem('loginAttempts');
  const numAttempts = attempts ? parseInt(attempts) : 0;
  if (numAttempts  >= 3) {
    return Promise.reject("block");
  }
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    localStorage.removeItem('loginAttempts');
    return data;
  } catch (error) {
    localStorage.setItem('loginAttempts', (numAttempts + 1).toString());
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
