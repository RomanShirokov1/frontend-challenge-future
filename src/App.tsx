import './App.css';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import RepositoryList from './components/RepositoryList';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserRepositories } from './redux_tk/slices/repositorySlice';
import { AppDispatch, RootState } from './redux_tk/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { repositories, loading, error } = useSelector((state: RootState) => state.repositories);

  const handleSearch = (username: string) => {
    const apiKey = process.env.REACT_APP_GITHUB_API_KEY;
    if (username && apiKey) {
      dispatch(searchUserRepositories({ username, apiKey }));
    }
  };

  return (
    <div className="wrapper">
      <Header onSearch={handleSearch} />
      <div className="content">
        {loading && <p>Загрузка...</p>}
        {error ? (
          <ErrorMessage message={error} />
        ) : repositories.length === 0 ? (
          <ErrorMessage message="Список пуст." />
        ) : (
          <RepositoryList repositories={repositories} />
        )}
      </div>
    </div>
  );
}

export default App;
