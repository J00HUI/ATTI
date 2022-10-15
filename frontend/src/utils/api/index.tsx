import axios from "axios";
import { BACKEND_URL } from "../../constant";

export const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const token = localStorage.getItem("AccessToken");

//로그인 이후부터
const apiAcc = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type" : "application/json",
    "Authorization" : ""+ token,
  },
});

export default apiAcc;