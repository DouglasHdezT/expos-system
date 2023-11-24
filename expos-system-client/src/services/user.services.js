import axios from 'axios';

const token_key = "expos-system-token";

export const login = async (identifier, password) => {
  try {
    const { data } = await axios.post("/auth/login", { identifier, password });
    return data.token;
  } catch (error) {
    return null;
  }
}

export const whoami = async (token="") => {
  try {
    const { data } = await axios.get("/auth/whoami", { headers: { Authorization: `Bearer ${token}` } });
    return data;   
  } catch (error) {
    return null;
  }
}

export const saveToken = (token = "") => localStorage.setItem(token_key, token);
export const getToken = () => localStorage.getItem(token_key);
export const clearToken = () => localStorage.removeItem(token_key);