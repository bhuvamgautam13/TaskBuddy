import axios from "axios";

const API = axios.create({
  baseURL: "https://taskbuddy-owc2.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = token;
  }

  return req;
});
const acceptTask = async (id) => {
  await API.put(`/tasks/${id}/accept`);
};

const completeTask = async (id) => {
  await API.put(`/tasks/${id}/complete`);
};

export default API;