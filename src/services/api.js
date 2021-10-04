import axios from "axios";

const api = axios.create({
  baseURL: "https://sistemapsv.natanoliveira.com.br/organizza",
  headers: {
    "Content-Type": "application/json"
  },
});
export default api;
