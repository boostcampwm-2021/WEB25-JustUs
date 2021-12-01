import axios, { AxiosInstance } from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const multiFormDataHeader = { headers: { "Content-Type": "multipart/form-data" } };
export const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  withCredentials: true,
});
