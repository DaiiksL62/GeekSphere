// JeuVideo.js
import React from 'react';
import Article from '../../Article/Article';
import styles from "../Series/Series.module.scss"
const Series = () => {
    // je répéter le composant Article 3 fois 
    const repeatCount = 3;

    return (
        <div>
            <h1 className={styles.titleJv}>Bienvenue sur la page "Series" de GeekSphere !</h1>
            <p className={styles.texteSeries}>Explorez notre collection de blogs dédiée aux séries ! Plongez dans des critiques, découvrez les dernières tendances, et trouvez de nouvelles séries à binge-watcher.
                <br></br>
                Des recommandations personnalisées aux analyses approfondies, notre page séries est votre compagnon idéal pour rester à jour et trouver votre prochaine série favorite. Bienvenue sur le blog des séries, où l'histoire ne s'arrête jamais.</p>
            {[...Array(repeatCount)].map((_, index) => (
                <Article key={index} />
            ))}
        </div>
    );
};

export default Series;