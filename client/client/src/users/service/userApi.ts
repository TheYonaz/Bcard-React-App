import axios from "axios";
import UserType, { Login, UserRegistered,NormalizedEditUser } from "../models/types/userType";
import Userinterface from "../models/interfaces/UserInterface"
import UserEditInterface from "../models/interfaces/UserEditInterface"
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const login = async (user: Login) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
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
    // delete serverUser._id;
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
