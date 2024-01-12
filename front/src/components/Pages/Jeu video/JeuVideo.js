// JeuVideo.js
import React from 'react';
import Article from '../../Article/Article';
import styles from "../Jeu video/JeuVideo.module.scss"
const JeuVideo = () => {
    // je répéter le composant Article 3 fois 
    const repeatCount = 3;

    return (
        <div>
            <h1 className={styles.titleJv}>Bienvenue sur la page "Jeux Vidéo" de GeekSphere !</h1>
            <p className={styles.texteJv}>Ici, c'est le spot décontracté des gamers. On parle jeux, astuces, et on partage nos moments geek préférés. Que vous soyez un pro du joystick ou un débutant curieux, bienvenue dans notre coin gaming. Prêt à jouer ? 🎮✨</p>
            {[...Array(repeatCount)].map((_, index) => (
                <Article key={index} />
            ))}
        </div>
    );
};

export default JeuVideo;
