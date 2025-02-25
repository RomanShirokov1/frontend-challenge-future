import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Repository, RepositoryState } from '../../@types/types';

const initialState: RepositoryState = {
  repositories: [],
  loading: false,
  error: 'Список пуст',
};

export const searchUserRepositories = createAsyncThunk(
  'repositories/searchUser ',
  async ({ username, apiKey }: { username: string; apiKey: string }) => {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.map((repo: any) => ({
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUserRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUserRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
      })
      .addCase(searchUserRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке';
      });
  },
});

export default repositorySlice.reducer;
