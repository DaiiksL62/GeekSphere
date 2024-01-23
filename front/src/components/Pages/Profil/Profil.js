import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import styles from '../Profil/Profil.module.scss';

const Profil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Effet si nécessaire
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/connexion');
    };

    const isAdmin = user?.etat === 2;

    return (
        <div className={styles.container}>
            <div className={styles.profileSection}>

                <nav className={styles.navProfil}>
                    <ul className={styles.linkProfil}>
                        <li>
                            <Link to="/profil" className={styles.link1}>Mon profil</Link>
                        </li>
                        <Link to={`/profil/modification/${user?.id}`} className={styles.link2}>
                            Modifier le profil
                        </Link>
                        <li>
                            <Link to="liked-articles" className={styles.link1}>Mes Articles Aimés</Link>
                        </li>
                        <li>
                            <Link to="disliked-articles" className={styles.link2}>Mes Articles Pas Aimés</Link>
                        </li>
                        <li>
                            <Link to={`/profil/supprimer/${user?.id}`} className={styles.link1}>Supprimer Mon Compte</Link>
                        </li>
                        {isAdmin && (
                            <>
                                <li>
                                    <Link to="manage-users" className={styles.link2}>Gérer les utilisateurs</Link>
                                </li>
                                <li>
                                    <Link to="create-article" className={styles.link1}>Créer un article</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                {user && (
                    <div className={styles.divInfo}>
                        <h1>Profil de {user?.username}</h1>
                        {/* Afficher l'avatar en construisant l'URL complète */}
                        <img src={`http://localhost:8000/uploads/profiles/${user.avatarFilename}`} alt="Avatar de l'utilisateur" className={styles.imgAvatar} />
                        <h3 className={styles.title1}>Prénom : {user.firstname}</h3>
                        <h3>Nom : {user.lastName}</h3>
                        <h3 className={styles.title1}>Email : {user.email}</h3>
                        <h3>Admin : {isAdmin ? 'Oui' : 'Non'}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profil;
