import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../api/request";
import { UserInfoResponse } from "../../types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return navigate("/login");
      }

      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await request<UserInfoResponse>("GET", "/users/info", headers);
        if (response.status === 200 && response.data) {
          setEmail(response.data.email);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div className="home">
      <h1 className="text-2xl text-center p-4">Welcome to the Home Page</h1>
      <p className="text-center">Logged in as {email}</p>
      <div className="flex justify-center mt-4">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
