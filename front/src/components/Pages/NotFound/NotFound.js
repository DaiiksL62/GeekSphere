import React from 'react';
import styles from "../NotFound/NotFound.module.scss"
import Logo from '../../../assets/img/GeekSphere(1).svg'; // Chemin relatif depuis le composant

const NotFound = () => {
    return (
        <div>
            <div className={styles.blockPhoto}>
                <img src={Logo} alt="Ma Photo" className={styles.logoimg} />
            </div>
            <h1 className={styles.h1Erreur}>OUPS!!!</h1>
            <h3 className={styles.h3Erreur}>La page que vous recherchez semble introuable</h3>
        </div>
    );
};

export default NotFound;