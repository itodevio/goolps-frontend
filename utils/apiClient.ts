import axios from "axios";
import app from "connection/firebase.connection";
import appEnv from "./appEnv";

export const ApiClient = axios.create({
  baseURL: appEnv.API_URL,
});

ApiClient.interceptors.request.use(
  async (config) => {
    if(!app.auth().currentUser) return;
    const token = await app.auth().currentUser.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
