import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const isTokenExpired = (payload: any) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return payload.exp && payload.exp < currentTime;
};

const decodeToken = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode the payload
        return payload;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null; 
    }
};

const Home: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('access_token='));
        const access_token = cookie ? cookie.split('=')[1] : null;



        console.log("Access Token:", access_token);

        console.log("Cookie:", cookie);
        // Check if the token exists and is a valid string
        if (!access_token || typeof access_token !== "string") {
            console.error("Invalid or missing access token");
            navigate("/login");
            return;
        }

        // Decode the token to get the payload
        const tokenPayload = decodeToken(access_token);

        // Check if the token is invalid or expired
        if (!tokenPayload || isTokenExpired(tokenPayload)) {
            console.error("Token is invalid or expired");
            navigate("/login");
            return;
        }
    }, [navigate]);

    return (
        <div className="home">
            <h1 className="text-2xl text-center p-4">Welcome to the Home Page</h1>
            <p className="text-center">You are logged in!</p>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
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