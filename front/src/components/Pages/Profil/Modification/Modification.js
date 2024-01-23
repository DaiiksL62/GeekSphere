import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../../../Inscription/Inscription.module.scss';

// ... (imports)

const Modification = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Le pseudo doit avoir au moins 3 caractères'),
        firstName: Yup.string(),
        lastName: Yup.string(),
        email: Yup.string().email("L'email n'est pas valide"),
        password: Yup.string().min(8, 'Le mot de passe doit avoir au moins 8 caractères'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas'),
        avatar: Yup.mixed().test('fileSize', "L'image est trop grande", (value) => {
            return !value || (value && value.size <= 1024 * 1024); // Taille maximale d'image : 1 Mo (modifiable selon vos besoins)
        }),
    });

    const formik = useFormik({
        initialValues: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            confirmPassword: '',
            avatar: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await updateProfile(values); // Utiliser la fonction d'updateProfile du contexte d'authentification

                // Rediriger l'utilisateur vers la page de profil après la modification réussie
                setIsUpdateSuccessful(true);
                setTimeout(() => {
                    setIsUpdateSuccessful(false); // Remettre à zéro l'état après la redirection
                    navigate('/');
                }, 3000);
            } catch (error) {
                console.error('Erreur lors de la modification du profil :', error);
                // Gérer les erreurs et afficher un message à l'utilisateur si nécessaire
            }
        },
    });

    return (
        <div>
            <h1 className={styles.titleInscription}>Modification de profil</h1>
            <div className={styles.registrationContainer}>
                {isUpdateSuccessful && (
                    <div className={styles.successMessage}>
                        Les informations ont été mises à jour avec succès ! Redirection vers la page de profil...
                    </div>
                )}
                <form onSubmit={formik.handleSubmit} className={styles.registrationForm}>
                    <label htmlFor="avatar">Photo de profil</label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={(event) => formik.setFieldValue('avatar', event.currentTarget.files[0])}
                    />
                    {formik.errors.avatar && <p className={styles.error}>{formik.errors.avatar}</p>}

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

                    <div className={styles.containerButton}>
                        <button className={styles.buttonSubmit} type="submit">Valider la modification</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modification;

