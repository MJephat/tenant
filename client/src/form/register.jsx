import { QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosInstance } from "../assets/axios";
import {Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const [usernanme, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = new QueryClient();

  const {mutate: registerMutation, isLoading}=useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/admin/signup", data);
      return res.data;
    },
    onSuccess:() =>{toast.success("admin created successfully")
    queryClient.invalidateQueries({querykey:["admin"]})
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.error("Admin already exists");
      } else if (error.response?.status === 400) {
        toast.error("Invalid credentials");
      } else if (error.response?.status === 500) {
        toast.error("Something went wrong");
      } else {
        toast.error(error.response?.data?.message || "An unexpected error occurred");
      }
    },
    });

    const handleRegister = (e) => {
      e.preventDefault();
      registerMutation({ usernanme, email, password });
    };




  return (
    <div style={styles.container}>
      <div style={styles.header}>Register</div>
      <div onSubmit={handleRegister} style={styles.form}>
        <input style={styles.input} type="text" placeholder="Full Name" onChange={(e) => setUsername(e.target.value)} />
        <input style={styles.input} type="email" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="password"  onChange={(e) => setPassword(e.target.value)}/>

        <div style={styles.checkboxContainer}>
          <input type="checkbox" id="updates" />
          <label htmlFor="updates" style={{ marginLeft: 8 }}>
            Keep me up to date
          </label>
        </div>

        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? <Loader className='animate-spin'/> : "Register"}
          </button>

        <div style={styles.footer}>
          <p>Need an account? <a href="/login">Log in</a></p>
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

export default RegisterForm;
