import React, { useState } from "react";
import request from "../../api/request";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    interface LoginResponse {
      accessToken: string;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await request<LoginResponse>("POST", "/authentication/login", headers, null, loginData);

      const { accessToken } = response.data;
      if (!accessToken) {
        throw new Error("Token is invalid or expired");
      }

      localStorage.setItem("accessToken", accessToken);

      alert("Login successful!");
      navigate("/home");

    } catch (error: any) {
      if(error?.response?.data?.message === 'Invalid credentials') {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("An error occurred during login. Please try again.");
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-form w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md p-4 text-sm">
      <h2 className="text-2xl text-center p-4">Welcome</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group font-bold p-2">
          <label htmlFor="email">Email: </label>
          <input
            className="border border-gray-300 focus:border-sky-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group font-bold p-2">
          <label htmlFor="password">Password: </label>
          <input
            className="border border-gray-300 focus:border-sky-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group font-bold p-2 text-center">
          <button
            type="submit"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;