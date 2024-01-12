import React from 'react';
import styles from "../Home/Home.module.scss"
import MyVideo from '../../../assets/video/acceuil.mp4';
import Article from '../../Article/Article';


const Home = () => {
    return (
        <div>
            <div className={styles.header1}>
                <video autoPlay loop muted className={styles.video1}>
                    <source src={MyVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <h1 className={styles.titleHome}>Bienvenue sur GeekSphere</h1>
            </div>
            <div className={styles.containerText}>
                <p className={styles.text}>
                    Explorez les recoins fascinants de la geekosphère à travers nos articles captivants. Que vous soyez un gamer invétéré, un amateur de films de science-fiction, ou un curieux avide de découvertes, vous trouverez ici une communauté vibrante qui partage votre passion.
                    GeekSphere n'est pas seulement un blog, c'est un espace interactif où l'échange et la créativité sont à l'honneur. Rejoignez-nous dans cette aventure où chaque billet est une invitation à explorer l'extraordinaire.
                    Préparez-vous à être inspiré, informé et divertit. Sur GeekSphere, l'imagination est la seule limite, et nous sommes ravis de vous accueillir dans notre sphère geek
                </p>
            </div>
            <h1 className={styles.h1Actu}>Les Dernières Actualité du Moment </h1>
            <Article />
        </div>
    );
};

export default Home;