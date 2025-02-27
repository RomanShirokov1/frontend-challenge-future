import './App.css';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import RepositoryList from './components/RepositoryList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux_tk/store';
import { useEffect, useRef } from 'react';
import { incrementPage, searchUserRepositories } from './redux_tk/slices/repositorySlice';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { repositories, loading, error, currentPage, username, hasMore } = useSelector(
    (state: RootState) => state.repositories,
  );
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (username) {
      dispatch(searchUserRepositories({ username, page: currentPage }));
    }
  }, [username, currentPage, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          // Проверяем hasMore
          dispatch(incrementPage());
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, dispatch, hasMore]);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {loading ? (
          <RepositoryList loading={loading} repositories={repositories} />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : repositories.length === 0 ? (
          <ErrorMessage message="У пользователя нет репозиториев." />
        ) : (
          <>
            <RepositoryList repositories={repositories} loading={loading} />
            <div ref={observerRef} style={{ height: '20px' }} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
