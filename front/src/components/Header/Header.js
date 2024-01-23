// Header.js
import React from 'react';
import styles from '../Header/Header.module.scss';
import Logo from '../../assets/img/GeekSphere(1).svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';  // Importez le hook useAuth

const Header = () => {
    const { user, logout } = useAuth();  // Utilisez le hook useAuth pour accéder à l'état d'authentification

    return (
        <div className={styles.blockHeader}>
            <img src={Logo} alt="Ma Photo" className={styles.logoimg} />
            <div className={styles.block}>
                <ul className={styles.Liens}>
                    <li>
                        <Link to="/jeu-video">Jeu vidéo</Link>
                    </li>
                    <li>
                        <Link to="/series">Séries</Link>
                    </li>
                    <li>
                        <Link to="/films">Films</Link>
                    </li>
                    <li>
                        <Link to="/technologies">Technologies</Link>
                    </li>
                    {user ? (
                        // Si l'utilisateur est connecté, affichez le pseudo et un lien de déconnexion
                        <>

                            <li>
                                <Link to="/profil">{user.username}</Link>
                            </li>
                            <li>
                                <button onClick={logout} className={styles.logoutButton}>Déconnexion</button>
                            </li>
                        </>
                    ) : (
                        // Si l'utilisateur n'est pas connecté, affichez les liens d'inscription et de connexion
                        <>
                            <li>
                                <Link to="/inscription">Inscription</Link>
                            </li>
                            <li>
                                <Link to="/connexion">Connexion</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
