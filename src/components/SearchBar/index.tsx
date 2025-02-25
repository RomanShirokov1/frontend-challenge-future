import React from 'react';
import styles from './SearchBar.module.scss'; // Импортируем стили

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Введите имя пользователя"
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;