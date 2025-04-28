import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axios.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const AuthContext = createContext();


// This should be your fetcher function
const fetchCurrentAdmin = async () => {
  const res = await axiosInstance.get("/admin/me");
  return res.data;
};

const logoutAdmin = async () => {
  const res = await axiosInstance.post("/admin/logout");
  localStorage.removeItem("admin");
  return res.data;
};

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    const Navigate = useNavigate();


  const {data: admin, isLoading, isError,} = useQuery({
    queryKey: ["currentAdmin"],
    queryFn: fetchCurrentAdmin,
    retry: false,
  });

  const logout = async () => {
    await logoutAdmin();
    queryClient.invalidateQueries("currentAdmin");
    Navigate("/")
  };
   

  return (
    <AuthContext.Provider value={{ admin, isLoading, isError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
