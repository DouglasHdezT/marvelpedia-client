import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { whoami, login as authLogin, register as authRegister } from "../services/AuthService";
import { useLoadingContext } from './LoadingContext';
import { toast } from "react-toastify";


const userContext = createContext();

export const UserContextProvider = ({...props}) => {
  const [token, setToken] = useState(localStorage.getItem("marvelpedia-token"));
  const [user, setUser] = useState(undefined);
  const { startLoading, stopLoading } = useLoadingContext();

  useEffect(()=> {
    const _verifyToken = async () => {
      startLoading();
      if(token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        
        const _user = await whoami();
        if(_user) {
          setUser(_user);
        } else {
          logout();
        }
      } else {
        axios.defaults.headers.Authorization = null;
      }
      stopLoading();
    }

    _verifyToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = useCallback((email, password) => {
    const _login = async () => {
      startLoading();

      const _token = await authLogin({email, password});
      if(_token) {
        setToken(_token);
        localStorage.setItem("marvelpedia-token", _token);
        toast("Login sucessful");
      } else {
        toast("Something went wrong", {type: "error"});
      }

      stopLoading();
    }

    _login();
  }, [startLoading, stopLoading]);

  const register = useCallback((email, password, success) => {
    const _register = async () => {
      startLoading();

      const status = await authRegister({email, password});
      if(status === 200 || status === 201) {
        toast("Register complete, now please login")
        success()
      } else {
        toast("Something went wrong, check your info", {type: "error"});

      }

      stopLoading();
    }

    _register();
  }, [startLoading, stopLoading]);

  const logout = useCallback(() => {
    if(token) {
      localStorage.removeItem("marvelpedia-token");
      setToken(undefined);
      setUser(undefined);
      toast("Logout succesfull")
    }
  }, [setToken, setUser]);

  const value = useMemo(() => ({
    token, user, logout, login, register
  }), [token, user, logout, login, register]);
  
  return <userContext.Provider value={value} {...props} />
}

export const useUserContext = () => useContext(userContext);