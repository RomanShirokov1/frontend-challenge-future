import React from 'react';
import styles from './RepositoryList.module.scss';
import RepositoryCard from '../RepositoryCard';
import { Repository } from '../../@types/types';
import Skeleton from '../Skeleton';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
}
const RepositoryList: React.FC<RepositoryListProps> = ({ repositories, loading }) => {
  return (
    <div className={styles.repositoryList}>
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} {...repo} />
      ))}
      {loading && Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />)}
    </div>
  );
};

export default RepositoryList;
