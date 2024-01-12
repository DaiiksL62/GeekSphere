
import React from 'react';
import Article from '../../Article/Article';
import styles from "../Films/Films.module.scss"
const Films = () => {
    // je répéter le composant Article 3 fois 
    const repeatCount = 3;

    return (
        <div>
            <h1 className={styles.titleFilms}>Bienvenue sur la page "Films" de GeekSphere !</h1>
            <p className={styles.texteFilms}>Explorez notre collection de critiques de films, bandes-annonces exclusives, et analyses approfondies.<br></br> Des classiques intemporels aux dernières sorties, notre page Films vous emmène dans un voyage cinématographique riche en émotions. <br></br>Plongez dans le monde du cinéma dès maintenant.</p>
            {[...Array(repeatCount)].map((_, index) => (
                <Article key={index} />
            ))}
        </div>
    );
};

export default Films;