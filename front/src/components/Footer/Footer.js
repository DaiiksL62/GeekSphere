import React from 'react';
import styles from "../Footer/Footer.module.scss"
import Twitter from "../../assets/img/twitter.png"
import Facebook from "../../assets/img/facebook.png"
import Discord from "../../assets/img/discorde.png"

const Footer = () => {
    return (
        <footer className={styles.blockFooter}>
            <div className={styles.containerIcon}>
                <div className={styles.IconBlock}>
                    <a href="#" className={styles.iconLink}>
                        <img src={Twitter} alt="Twitter" className={styles.icon} />
                    </a>
                    <a href="#" className={styles.iconLink}>
                        <img src={Facebook} alt="Facebook" className={styles.icon} />
                    </a>
                    <a href="#" className={styles.iconLink}>
                        <img src={Discord} alt="Discord" className={styles.icon} />
                    </a>
                </div>
                <div className={styles.linkBlock}>
                    <a href="#" className={styles.link}>Mentions Légales</a>
                    <a href="#" className={styles.link}>Politique de Confidentialité</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;