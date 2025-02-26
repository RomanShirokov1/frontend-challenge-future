import React, { useCallback } from 'react';
import styles from './SearchBar.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux_tk/store';
import {
  resetRepositories,
  searchUserRepositories,
  setUsername,
} from '../../redux_tk/slices/repositorySlice';
import debounce from 'lodash.debounce';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        dispatch(setUsername(value));
      } else {
        dispatch(resetRepositories());
      }
    }, 400),
    [dispatch],
  );

  return (
    <div className={styles.searchBar}>
      <div className={styles.root}>
        <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
        </svg>
        <input
          type="text"
          placeholder="Введите имя пользователя"
          className={styles.input}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
