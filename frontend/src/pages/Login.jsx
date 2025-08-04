import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); 
const handleLogin = async () => {
  try {
    const res = await axios.post("https://minilinkedinn.onrender.com/api/users/login", { email, password });
    const { user, token } = res.data;
    const userWithToken = { ...user, token };
    localStorage.setItem("user", JSON.stringify(userWithToken));
    setUser(userWithToken);
    navigate("/");
  } catch (err) {
    alert("Invalid credentials");
  }
};


  return (
    <div className="h-100  flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-500 mt-4">
          New to LinkedIn? <a href="/register" className="text-blue-600 hover:underline">Join now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
