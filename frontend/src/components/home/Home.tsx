import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (!access_token || typeof access_token !== "string") {
            console.error("Token is invalid or expired");
            navigate("/login");
            return;
        }
    }, [navigate]);

    return (
        <div className="home">
            <h1 className="text-2xl text-center p-4">Welcome to the Home Page</h1>
            <p className="text-center">Logged in succesfully!</p>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs"
                    onClick={() => {
                        localStorage.removeItem("access_token");
                        alert("You have been logged out.");
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;