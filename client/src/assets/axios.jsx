import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:3000/api/v1",
    baseURL: "import.meta.env.VITE_API_URL",
    withCredentials: true,
  });
  
    axiosInstance.interceptors.request.use(config =>{
        const token = localStorage.getItem("jwt-admin");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    })

    axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err.response?.status === 401) {
            // Optionally show a toast or message
            // window.location.href = "/login";
          }
          return Promise.reject(err);
        }
      );