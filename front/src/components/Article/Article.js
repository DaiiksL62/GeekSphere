import React from 'react';
import styles from "../Article/Article.module.scss";

const Article = () => {
    const articles = [
        { id: 1, title: 'Article 1', content: 'Contenu de l\'article 1' },
        { id: 2, title: 'Article 2', content: 'Contenu de l\'article 2' },
        { id: 3, title: 'Article 3', content: 'Contenu de l\'article 3' },
        { id: 4, title: 'Article 4', content: 'Contenu de l\'article 4' },
        // Ajoutez plus d'articles ici si nécessaire
    ];

    return (
        <div className={styles.containerCard}>
            <div className={styles.row}>
                {articles.map((article) => (
                    <a key={article.id} href={`/article/${article.id}`} className={`${styles.card} ${styles.mb4}`}>
                        <img className={styles.cardImg} src={`https://via.placeholder.com/300x150?text=${article.title}`} alt={article.title} />
                        <div className={styles.cardBody}>
                            <div className={styles.cardTitle}>{article.title}</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Article;


