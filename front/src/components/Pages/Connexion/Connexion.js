import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import styles from '../Connexion/Connexion.module.scss';
import { useAuth } from '../../../AuthContext'; // Import the useAuth hook
import Logo from '../../../assets/img/GeekSphere(1).svg';

const Connexion = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Ajout de la variable d'état

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Le pseudo est obligatoire'),
        password: Yup.string().required('Le mot de passe est obligatoire'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                // Make a request to the backend to handle authentication using the POST method
                const response = await fetch('http://localhost:8000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    // If authentication is successful, handle the response
                    const userFromServer = await response.json();
                    login(userFromServer.user);

                    // Afficher le message de réussite
                    setSuccessMessage('Connexion réussie ! Redirection en cours...');

                    // Rediriger l'utilisateur après un court délai (par exemple, 2 secondes)
                    setTimeout(() => {
                        navigate('/'); // Redirige vers la page de profil
                    }, 5000);
                } else {
                    // Handle the case where authentication fails
                    setErrorMessage('Erreur lors de la connexion. Vérifiez vos informations.');
                    console.error('Erreur lors de la connexion');
                }
            } catch (error) {
                // Handle errors that occur during the login request
                setErrorMessage('Erreur lors de la connexion. Veuillez réessayer plus tard.');
                console.error("Erreur lors de la connexion : ", error);
            }
        },
    });

    return (
        <div className={styles.registrationContainer}>
            <h1 className={styles.titleInscription}>Connexion</h1>
            <img src={Logo} alt="Ma Photo" className={styles.logoimg} />
            <form onSubmit={formik.handleSubmit} className={styles.registrationForm}>
                {/* Form fields */}
                <label htmlFor="username">Pseudo</label>
                <input type="text" id="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                {formik.errors.username && <p className={styles.error}>{formik.errors.username}</p>}

                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                {formik.errors.password && <p className={styles.error}>{formik.errors.password}</p>}

                <div className={styles.containerButton}>
                    <button className={styles.buttonSubmit} type="submit">
                        Connexion
                    </button>
                </div>
            </form>

            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        </div>
    );
};

export default Connexion;



