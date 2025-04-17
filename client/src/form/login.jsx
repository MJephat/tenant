import React from "react";

const LoginForm = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>Login</div>
      <div style={styles.form}>
        {/* <input style={styles.input} type="text" placeholder="Full Name" /> */}
        <input style={styles.input} type="email" placeholder="Enter your email" />
        <input style={styles.input} type="password" placeholder="Password" />

        <div style={styles.checkboxContainer}>
          <input type="checkbox" id="updates" />
          <label htmlFor="updates" style={{ marginLeft: 8 }}>
            Keep me up to date
          </label>
        </div>

        <button style={styles.button}>Login</button>

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
