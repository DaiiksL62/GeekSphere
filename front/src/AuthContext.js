// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        // Récupérer les informations de l'utilisateur depuis le backend lors du chargement initial
        fetchUserFromBackend();
    }, []);

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

    const updateProfile = async (updatedUserData) => {
        try {
            // Optimistically update local state
            setUser(updatedUserData);

            // Send a PUT request to the server for updating the user profile
            const response = await fetch(`http://localhost:8000/profile/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.ok) {
                // If the profile update is successful, fetch and update the latest user data from the server
                fetchUserFromBackend();
            } else {
                // Handle errors during profile update
                const errorMessage = await response.text(); // Get error message from server
                console.error('Error during profile update:', response.status, errorMessage);

                // Optionally handle different error scenarios and show appropriate messages to the user
            }
        } catch (error) {
            // Handle errors during the profile update request
            console.error('Error during profile update request:', error);

            // Optionally show a generic error message to the user
        }
    };

    const deleteUser = async () => {
        try {
            // Faites une requête au backend pour supprimer le compte
            const response = await fetch(`http://localhost:8000/user/${user.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Si la suppression est réussie, mettez à jour le state local et déconnectez l'utilisateur
                setUser(null);
                localStorage.removeItem('user');
            } else {
                // Gérez les erreurs de suppression du compte
                const errorMessage = await response.text();
                console.error('Erreur lors de la suppression du compte :', response.status, errorMessage);
                throw new Error('Erreur lors de la suppression du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
            throw new Error('Erreur lors de la suppression du compte');
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


    const contextValues = {
        user,
        login,
        logout,
        updateProfile,
        deleteUser,
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

