import axios from "axios";

export const fetchExpos = async () => {
  try {
    const { data } = await axios.get("/api/expo/");
    return data.expos || [];
  } catch (error) {
    return [];
  }
}

export const fetchExpoById = async (id) => {
  try {
    const { data } = await axios.get(`/api/expo/${id}`);
    return data;
  } catch (error) {
    return null;
  }
}

export const fetchOwnExpos = async () => {
  try {
    const { data } = await axios.get("/api/expo/own");
    return data.expos;
  } catch (error) {
    return [];
  }
}

export const toggleSubs = async (_id) => {
  try {
    const { data } = await axios.post(`/api/expo/sub/${_id}`);
    return data;
  } catch (error) {
    return false;
  }
} 

export const toggleAttend = async (expo, attendants) => {
  try {
    const { data } = await axios.post(`/api/expo/attend/${expo}`, { attendants });
    return data;
  } catch (error) {
    return false;
  }
} 

export const fetchStats = async () => {
  try {
    const { data } = await axios.get("/api/expo/stats");
    return data;
  } catch (error) {
    return [];
  }
}

export const fetchEvaluation = async () => {
  try {
    const { data } = await axios.get("/evaluation.json");
    return data;
  } catch (error) {
    return null;
  }
}