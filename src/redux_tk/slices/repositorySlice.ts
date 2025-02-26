import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Repository, RepositoryState } from '../../@types/types';

const initialState: RepositoryState = {
  repositories: [],
  loading: false,
  error: 'Начните поиск.',
  currentPage: 1,
  username: '',
};

export const searchUserRepositories = createAsyncThunk(
  'repositories/searchUser ',
  async ({ username, page }: { username: string; page: number }) => {
    const apiKey = process.env.REACT_APP_GITHUB_API_KEY;
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=20&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    return response.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      description: repo.description,
    })) as Repository[];
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
        state.loading = false;
        state.repositories = [...state.repositories, ...action.payload];
      })
      .addCase(searchUserRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке';
      });
  },
});

export const { resetRepositories, incrementPage, setUsername } = repositorySlice.actions;
export default repositorySlice.reducer;
