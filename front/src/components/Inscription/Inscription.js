import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import styles from '../Inscription/Inscription.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Importer le hook useAuth

const Inscription = () => {
    const { login, user } = useAuth(); // Accéder aux fonctions d'authentification depuis useAuth
    const navigate = useNavigate();
    const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

    const validationSchema = Yup.object().shape({
        // Ajoutez vos règles de validation pour chaque champ
        username: Yup.string()
            .required('Le pseudo est obligatoire')
            .min(3, 'Le pseudo doit avoir au moins 3 caractères')
            .max(20, 'Le pseudo ne peut pas dépasser 20 caractères')
            .matches(/^\w+$/, 'Le pseudo ne peut contenir que des lettres, des chiffres et des underscores'),

        firstName: Yup.string()
            .required('Le nom est obligatoire'),

        lastName: Yup.string()
            .required('Le prénom est obligatoire'),

        email: Yup.string()
            .email('L\'email n\'est pas valide')
            .required('L\'email est obligatoire'),

        password: Yup.string()
            .required('Le mot de passe est obligatoire')
            .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
            .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre'),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
            .required('La confirmation du mot de passe est obligatoire'),

        agreeToTerms: Yup.boolean()
            .oneOf([true], 'Vous devez accepter les Conditions Générales d\'Utilisation'),
    });

    const formik = useFormik({
        initialValues: {
            profilePicture: '',
            username: 'Florian12',
            firstName: 'momo',
            lastName: 'flo',
            email: 'florianduval62@gmail.com',
            password: '123456789',
            confirmPassword: '123456789',
            agreeToTerms: false,
        },
        validationSchema,
        onSubmit: async (values) => {

            try {
                const formData = new FormData();
                // Authentification réussie
                login({ username: values.username }); // Ajustez avec les données réelles de l'utilisateur

                // Ajoutez chaque champ et fichier à FormData
                Object.entries(values).forEach(([key, value]) => {
                    if (key === 'profilePicture') {
                        formData.append(key, value);
                    } else {
                        formData.append(key, value);
                    }
                });

                const response = await fetch("http://localhost:8000/inscription", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                // Traitez la réponse du serveur ici
                console.log(data);

                // Affichez le message de succès
                setIsSubmissionSuccessful(true);

                // Redirection vers le profil après inscription réussie
                setTimeout(() => {
                    navigate('/profil');
                }, 5000);

            } catch (error) {
                // Gérez l'erreur lors de l'envoi du formulaire
                console.error("Erreur lors de l'envoi de la requête : ", error);
            }
        },
    });

    return (
        <div>
            <h1 className={styles.titleInscription}>Inscription</h1>
            <p className={styles.textP}>
                Envie de personnaliser ton expérience sur GeekSphere ? Inscris-toi vite ! C'est gratuit et en prime, tu pourras
                aimer (ou ne pas aimer) les articles en un clic.
            </p>
            <div className={styles.registrationContainer}>
                <form onSubmit={formik.handleSubmit} className={styles.registrationForm} encType="multipart/form-data">
                    {/* Champs du formulaire */}
                    <label htmlFor="profilePicture">Photo de profil</label>
                    <input type="file" id="profilePicture" name="profilePicture" onChange={(event) => formik.setFieldValue('profilePicture', event.currentTarget.files[0])} multiple />

                    <label htmlFor="username">Pseudo</label>
                    <input type="text" id="username" name="username" onChange={formik.handleChange} value={formik.values.username} />
                    {formik.errors.username && <p className={styles.error}>{formik.errors.username}</p>}

                    <label htmlFor="firstName">Nom</label>
                    <input type="text" id="firstName" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} />
                    {formik.errors.firstName && <p className={styles.error}>{formik.errors.firstName}</p>}

                    <label htmlFor="lastName">Prénom</label>
                    <input type="text" id="lastName" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} />
                    {formik.errors.lastName && <p className={styles.error}>{formik.errors.lastName}</p>}

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                    {formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                    {formik.errors.password && <p className={styles.error}>{formik.errors.password}</p>}

                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword && <p className={styles.error}>{formik.errors.confirmPassword}</p>}

                    <label>
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formik.values.agreeToTerms}
                            onChange={formik.handleChange}
                        />
                        CGU
                    </label>
                    {formik.errors.agreeToTerms && <p className={styles.error}>{formik.errors.agreeToTerms}</p>}

                    <div className={styles.containerButton}>
                        <button className={styles.buttonSubmit} type="submit">Validation</button>
                    </div>
                </form>

                {isSubmissionSuccessful && (
                    <div className={styles.successMessage}>
                        Inscription réussie ! Merci de vous être inscrit.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inscription;
