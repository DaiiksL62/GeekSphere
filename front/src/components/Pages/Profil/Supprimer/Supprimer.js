import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../AuthContext';
import styles from '../../Profil/Supprimer/Supprimer.module.scss';

const Supprimer = () => {
    const { user, deleteUser } = useAuth();
    const navigate = useNavigate();
    const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);

    const handleDelete = async () => {
        try {
            // Appeler la fonction de suppression du contexte d'authentification
            await deleteUser();

            // Mettre à jour l'état pour afficher le message de succès et rediriger après 3 secondes
            setIsDeleteSuccessful(true);
            setTimeout(() => {
                setIsDeleteSuccessful(false); // Remettre à zéro l'état après la redirection
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
            // Gérer les erreurs et afficher un message à l'utilisateur si nécessaire
        }
    };

    return (
        <div>
            <h1 className={styles.titleSupprimer}>Suppression de compte</h1>
            <div className={styles.deleteContainer}>
                {isDeleteSuccessful && (
                    <div className={styles.successMessage}>
                        Le compte a été supprimé avec succès ! Redirection vers la page d'accueil...
                    </div>
                )}

                <p className={styles.confirmationMessage}>
                    Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
                </p>

                <div className={styles.containerButton}>
                    <button className={styles.buttonDelete} onClick={handleDelete}>
                        Supprimer le compte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Supprimer;
