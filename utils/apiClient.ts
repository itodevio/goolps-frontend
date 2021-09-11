import axios from "axios";
import appEnv from "./appEnv";

export const ApiClient = axios.create({
  baseURL: appEnv.API_URL,
});
