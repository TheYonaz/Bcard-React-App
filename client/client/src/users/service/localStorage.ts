import JwtDecode from "jwt-decode";
import { TokenType } from "../models/types/userType";

const TOKEN = "token";

export const setTokenInLocalStorage = (encryptedToken: string) => {
  return localStorage.setItem(TOKEN, encryptedToken);
};

export const getUser = () => {
  const token = localStorage.getItem(TOKEN);
  if (!token) return null;
  const user: TokenType = JwtDecode(token);
  return user;
};
export const getRemainingTime = () => {
  const remainingTime = localStorage.getItem("remainingTime");
  if (remainingTime) {
    const parsedTime = parseInt(remainingTime);
    if (!isNaN(parsedTime)) {
      return parsedTime;
    }
  }
  return undefined;
};
export const setRemainingTime = (time: number | undefined) => {
  if (time !== undefined) {
    localStorage.setItem("remainingTime", time.toString());
  } else {
    localStorage.removeItem("remainingTime");
  }
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);
