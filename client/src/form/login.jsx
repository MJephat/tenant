import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosInstance } from "../assets/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const Navigate = useNavigate();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (adminData) =>axiosInstance.post("/admin/login", adminData),
    onSuccess: ()=>{
      console.log("Login success triggered");
      toast.success("Login successful")
      queryClient.invalidateQueries({queryKey:["admin"]})
      Navigate("/dashboard")
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Login</div>
      <div style={styles.form}>
        <input style={styles.input} type="text" placeholder="Username" name="username" onChange={(e) => setUserName(e.target.value)} required/>
        <input style={styles.input} type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} required />

        <div style={styles.checkboxContainer}>
          <input type="checkbox" id="updates" />
          <label htmlFor="updates" style={{ marginLeft: 8 }}>
            Keep me up to date
          </label>
        </div>

        <button onClick={handleLogin} style={styles.button}>{isLoading ? <Loader className="size-5 animate-spin" />: "Login" }</button>

        <div style={styles.footer}>
          <p>Need an account? <a href="/register">Register</a></p>
          <p><a href="/forgot-password">Forget Password?</a></p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    border: "1px solid #ddd",
    borderRadius: 6,
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(206, 192, 192, 0.05)",
    fontFamily: "sans-serif",
  },
  header: {
    backgroundColor: "#D9DDDC",
    color: "#fff",
    textAlign: "center",
    padding: "16px 0",
    fontSize: "20px",
    fontWeight: "bold",
  },
  form: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    padding: 12,
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#12C9FF",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: 16,
  },
};

export default LoginForm;
