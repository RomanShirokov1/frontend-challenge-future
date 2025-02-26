import React from 'react';
import styles from './Header.module.scss';
import SearchBar from '../SearchBar';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>GitHub Repositories</h1>
      <SearchBar />
    </header>
  );
};

export default Header;
