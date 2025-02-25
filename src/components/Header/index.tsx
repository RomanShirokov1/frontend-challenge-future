import React from 'react';
import styles from './Header.module.scss';
import SearchBar from '../SearchBar';

interface HeaderProps {
  onSearch: (username: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className={styles.header}>
      <h1>GitHub Repositories</h1>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
