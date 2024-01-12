// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupérer les informations de l'utilisateur depuis le backend lors du chargement initial
        fetchUserFromBackend();
    }, []);

    const login = async (userData) => {
        try {
            // Optimistically update local state
            setUser(userData);

            // Send a POST request to the server for user login
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // If the login is successful, get the user data from the server
                const userFromServer = await response.json();

                // Update local state with user data from the server
                setUser(userFromServer);

                // Store user data from the server in localStorage
                localStorage.setItem('user', JSON.stringify(userFromServer));

                // If applicable, fetch and update the user profile
            } else {
                // Handle errors during login
                const errorMessage = await response.text(); // Get error message from server
                console.error('Error during login:', response.status, errorMessage);

                // Optionally handle different error scenarios and show appropriate messages to the user
            }
        } catch (error) {
            // Handle errors during the login request
            console.error('Error during login request:', error);

            // Optionally show a generic error message to the user
        }
    };



    const logout = async () => {
        try {
            // Faites une requête au backend pour gérer la déconnexion
            await fetch('http://localhost:8000/logout');
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Erreur lors de la requête de déconnexion :', error);
        }
    };

    const fetchUserFromBackend = async () => {
        try {
            // Faites une requête au backend pour récupérer les informations de l'utilisateur
            const response = await fetch('http://localhost:8000/user');
            if (response.ok) {
                const userFromServer = await response.json();
                setUser(userFromServer);
            }
        } catch (error) {
            console.error('Erreur lors de la requête pour récupérer l\'utilisateur :', error);
        }
    };

    const contextValues = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};

