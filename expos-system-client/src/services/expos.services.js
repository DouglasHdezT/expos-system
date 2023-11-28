import axios from "axios";

export const fetchExpos = async () => {
  try {
    const { data } = await axios.get("/expo/");
    return data.expos || [];
  } catch (error) {
    return [];
  }
}

export const fetchExpoById = async (id) => {
  try {
    const { data } = await axios.get(`/expo/${id}`);
    return data;
  } catch (error) {
    return null;
  }
}

export const fetchOwnExpos = async () => {
  try {
    const { data } = await axios.get("/expo/own");
    return data.expos;
  } catch (error) {
    return [];
  }
}

export const toggleSubs = async (_id) => {
  try {
    const { data } = await axios.post(`/expo/sub/${_id}`);
    return data;
  } catch (error) {
    return false;
  }
} 