import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");



    
    setPassword("");
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
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs">
            Login
        </button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
