import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log("Login successful, token stored:", token);
          navigate("/home");
        } else {
          console.log("Login failed, no token received.");
        }
      })
      .catch((err) => {
        console.log("Error logging in:", err);
      });
  };

  return (
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <hr style={{width}} />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button>Login</button>
      </form>
  );
};
