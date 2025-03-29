import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const isTokenExpired = (payload: any) => {
    const currentTime = Math.floor(Date.now() / 1000); 
    return payload.exp && payload.exp < currentTime;
};

const decodeToken = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        return payload;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null; 
    }
};

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");

        if (!access_token || typeof access_token !== "string") {
            console.error("Invalid or missing access token");
            navigate("/login");
            return;
        }

        const tokenPayload = decodeToken(access_token);

        if (!tokenPayload || isTokenExpired(tokenPayload)) {
            console.error("Token is invalid or expired");
            navigate("/login");
            return;
        }

        if (tokenPayload.email) {
            setEmail(tokenPayload.email);
        } else {
            console.error("Email not found in token payload");
        }

    }, [navigate]);

    return (
        <div className="home">
            <h1 className="text-2xl text-center p-4">Welcome to the Home Page</h1>
            <p className="text-center">Logged in as: {email}</p>
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