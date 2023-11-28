import { useContext, createContext, useMemo, useState, useEffect, useCallback } from 'react';
import { whoami, getToken, clearToken, login, saveToken } from "../services/user.services";

import axios from 'axios';
import { useConfigContext } from './ConfigContext';

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());

  const { startLoading, stopLoading } = useConfigContext();

  useEffect(() => {
    const _verify = async () => {
      startLoading();
      if(token) {
        const _user = await whoami(token);
        
        if(_user) {
          axios.defaults.headers.common.Authorization = `Bearer ${token}`; 
          setUser(_user);
        } else {
          setToken(null) 
          clearToken(); 
        }
      } else {
        axios.defaults.headers.common.Authorization = undefined;
        setUser(null);
        clearToken(); 
      }
      stopLoading();
    }

    _verify()
  }, [token, startLoading, stopLoading]);

  const handleLogin = useCallback(async (identifier, password) => {
    startLoading();

    let status = false;
    const _token = await login(identifier, password);
    
    if(_token) {
      setToken(_token);
      saveToken(_token);
      status = true;
    }

    stopLoading();
    return status;
  }, [startLoading, stopLoading]);

  const handleLogout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo(()=> (
    {
      user,
      token, 
      login: handleLogin,
      logout: handleLogout,
    }
  ), [user, token, handleLogin, handleLogout]);
  
  return <UserContext.Provider value={value} {...props} />
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);

  if(!context)
    throw new Error("useUserContext outside UserContextProvider");

  return context;
}