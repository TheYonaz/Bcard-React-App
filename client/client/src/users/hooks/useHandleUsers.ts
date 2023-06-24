import { useState, useCallback, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { login, signup, EditUser, GetUser } from "../service/userApi";

import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
  getRemainingTime,
  setRemainingTime,
} from "../service/localStorage";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "./../../routes/routesModel";
import UserType, {
  Login,
  RegistrationForm,
  TokenType,
  userMapToModelType,
} from "../models/types/userType";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useUser } from "../providers/UserProviders";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeEditUser from "../helpers/normalization/normalizeUserEdit";

const useHandleUsers = () => {
  const [timerActivated, setTimerActivated] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(false);
  const [seconds, setTime] = useState<number | undefined>(200);
  const snack = useSnack();
  useAxios();
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [attempts, setAttempts] = useState(0);
  // useEffect(() => {
  //   // console.log(timerActivated);
  //   console.log(seconds);
  //   if (timerActivated && seconds && seconds > 0) {
  //     console.log("in cb");
  //     const timer = setInterval(
  //       () => setTime((prev) => (prev ? prev - 1 : prev)),
  //       1000
  //     );
  //     if (seconds <= 0) {
  //       clearInterval(timer);
  //       setTime((prev) => (prev = 200));
  //       setTimerActivated(false)
  //     }
  //     localStorage.removeItem("loginAttempts");
  //     setAttempts(prev => prev = 0)
  //     console.log(seconds);
  //   }
  // }, [timerActivated, seconds]);
  // const remainingTime = getRemainingTime();
  // useEffect(() => {
  //   if (timerActivated && remainingTime && remainingTime > 0) {
  //     const timer = setInterval(() => {
  //       const updatedTime = getRemainingTime();

  //       setRemainingTime(updatedTime ? updatedTime - 1 : updatedTime);
  //       if (updatedTime)
  //         if (updatedTime <= 0) {
  //           clearInterval(timer);
  //         }
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [timerActivated, remainingTime]);
  
  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: string | null,
      user: null | TokenType = null,
      userData?: UserType
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
      if (userData) setUserData(userData);
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user: Login) => {
      try {
        setLoading(true);
        const token = await login(user);
        setTokenInLocalStorage(token);
        setToken(token);
        const userFromLocalStorage = getUser();
        requestStatus(false, null, userFromLocalStorage);
        setAttempts((prev) => (prev = 0));
        navigate(ROUTES.CARDS);
      } catch (error) {
        console.log(error);
        // console.log(timerActivated);
        // setAttempts((prev) => prev + 1);
        // if (attempts >= 3) {
        //   if (!timerActivated) {
        //     setTimerActivated(true);
        //   }
        //   const logFailError =
        //     "3 Failed attempts , Log In is blocked for 24 Hours";
        //   snack("error", logFailError);
        //   requestStatus(false, logFailError, null);
        // }
        if (typeof error === "string") requestStatus(false, error, null);
      }

      // snack("error", `wait until unlocked`);
    },
    [navigate, requestStatus, setToken,attempts]
  );
  // const handleFailedLogin = useCallback(){}

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);
  const handleSignup = useCallback(
    async (user: RegistrationForm) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );
  const handelEditUser = useCallback(
    async (user: userMapToModelType) => {
      try {
        setLoading(false);
        const normalize_User = normalizeEditUser(user);
        normalize_User._id = user._id;
        await EditUser(normalize_User);
        requestStatus(false, null, null);
        snack("success", "The user has been successfully updated");
        navigate(ROUTES.ROOT);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [user]
  );
  const handelGetUser = useCallback(
    async (userId: string) => {
      try {
        setLoading(false);
        const userFromClient = await GetUser(userId);
        if (userFromClient) {
          requestStatus(false, null, user, userFromClient);
          return userFromClient;
        }
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [userData]
  );

  const value = useMemo(() => {
    return { isLoading, error, user, attempts, seconds };
  }, [isLoading, error, user, seconds]);

  return {
    value,
    handleLogin,
    handleLogout,
    handleSignup,
    handelEditUser,
    handelGetUser,
  };
};

export default useHandleUsers;
