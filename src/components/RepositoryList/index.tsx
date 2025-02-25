import React from 'react';
import styles from './RepositoryList.module.scss';
import RepositoryCard from '../RepositoryCard';
import { Repository } from '../../@types/types';

interface RepositoryListProps {
  repositories: Repository[];
}
const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div className={styles.repositoryList}>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} {...repo} />
      ))}
    </div>
  );
};

export default RepositoryList;
