import React from 'react';
import styles from './RepositoryCard.module.scss'; // Импортируем стили

interface RepositoryCardProps {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  name,
  description,
  html_url,
  stargazers_count,
  updated_at,
}) => {
  return (
    <div className={styles.repositoryCard}>
      <h2 className={styles.repositoryName}>
        <a className={styles.repositoryLink} href={html_url}>
          {name}
        </a>
      </h2>
      <p className={styles.repositoryDescription}>{description || 'Нет описания'}</p>
      <div className={styles.repositoryInfo}>
        <span className={styles.stars}>⭐ {stargazers_count}</span>
        <span className={styles.updatedAt}>
          Обновлено: {new Date(updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default RepositoryCard;
