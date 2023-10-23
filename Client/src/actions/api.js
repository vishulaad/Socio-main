import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8800/api" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
  });

  export const createPost = (newPost) => API.post("/posts/create", newPost);