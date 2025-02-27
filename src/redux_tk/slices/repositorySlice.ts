import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Repository, RepositoryState } from '../../@types/types';

const initialState: RepositoryState = {
  repositories: [],
  loading: false,
  error: 'Начните поиск.',
  currentPage: 1,
  username: '',
  hasMore: true,
};

export const searchUserRepositories = createAsyncThunk(
  'repositories/searchUser ',
  async ({ username, page }: { username: string; page: number }) => {
    const apiKey = process.env.REACT_APP_GITHUB_API_KEY;

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=20&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      return {
        repos: response.data.map((repo: Repository) => ({
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at,
          description: repo.description,
        })) as Repository[],
        hasMore: response.data.length > 0,
      };
    } catch (err) {
      throw new Error('Ошибка при загрузке репозиториев. Проверьте имя пользователя.');
    }
  },
);

const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    resetRepositories: (state) => {
      state.repositories = [];
      state.error = 'Начните поиск.';
      state.currentPage = 1;
      state.hasMore = true;
      state.username = '';
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      state.currentPage = 1;
      state.repositories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchUserRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserRepositories.fulfilled, (state, action) => {
        state.repositories = [...state.repositories, ...action.payload.repos];
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(searchUserRepositories.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при загрузке';
        state.loading = false;
      });
  },
});

export const { resetRepositories, incrementPage, setUsername } = repositorySlice.actions;
export default repositorySlice.reducer;
