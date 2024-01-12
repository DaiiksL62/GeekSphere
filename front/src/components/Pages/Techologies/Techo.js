
import React from 'react';
import Article from '../../Article/Article';
import styles from "../Techologies/Techo.module.scss"
const Techo = () => {
    // je répéter le composant Article 3 fois 
    const repeatCount = 3;

    return (
        <div>
            <h1 className={styles.titleTech}>Bienvenue sur la page "Techologies" de GeekSphere !</h1>
            <p className={styles.texteTech}>Découvrez les dernières innovations, tendances et analyses pointues dans le monde de la technologie. De l'intelligence artificielle à la tech verte, plongez dans l'univers en constante évolution de la tech avec nos articles informatifs et captivants. Explorez le futur dès aujourd'hui sur notre page Technologie.</p>
            {[...Array(repeatCount)].map((_, index) => (
                <Article key={index} />
            ))}
        </div>
    );
};

export default Techo;