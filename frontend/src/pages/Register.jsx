import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", bio: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // ✅

  const handleRegister = async () => {
    try {
      const { bio, ...rest } = form;
      const payload = { ...rest, about: bio };
      const res = await axios.post("https://minilinkedinn.onrender.com/api/users/register", payload);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // ✅ update context
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-100 flex items-center justify-center px-4 overflow-hidden">
      <div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Join LinkedIn</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-blue-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <textarea
          placeholder="About you"
          className="w-full p-2 border border-gray-300 rounded mb-4 resize-none h-20 focus:outline-blue-500"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-500 mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
