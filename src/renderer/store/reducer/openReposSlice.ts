import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IRepository } from 'renderer/interface/IRepository';
import { OpenReposStateInterface } from 'renderer/interface/redux/OpenReposStateInterface';

const initialState: OpenReposStateInterface = {
  repos: [],
  isLoading: false,
  isSuccessful: false,
  error: {},
};

export const openReposSlice = createSlice({
  name: 'openRepos',
  initialState,
  reducers: {
    getOpenedReposRequestAction: (state: OpenReposStateInterface) => {
      state.isLoading = true;
    },
    getOpenedReposSuccessAction: (
      state: OpenReposStateInterface,
      action: PayloadAction<IRepository[]>
    ) => {
      state.repos = action.payload;
      state.isLoading = false;
      state.isSuccessful = true;
    },
    getOpenedReposFailedAction: (state: OpenReposStateInterface) => {
      state.isSuccessful = false;
    },
    closeOpenedRepoRequestAction(
      state: OpenReposStateInterface,
      action: PayloadAction<{ id: string }>
    ) {},
    closeOpenedRepoSuccessAction(
      state: OpenReposStateInterface,
      action: PayloadAction<IRepository[]>
    ) {
      state.repos = action.payload;
      state.isLoading = false;
      state.isSuccessful = true;
    },
    closeOpenedRepoFailedAction(state: OpenReposStateInterface) {
      state.isSuccessful = false;
    },
  },
});

export const {
  getOpenedReposRequestAction,
  getOpenedReposSuccessAction,
  getOpenedReposFailedAction,
  closeOpenedRepoRequestAction,
  closeOpenedRepoSuccessAction,
  closeOpenedRepoFailedAction,
} = openReposSlice.actions;

export default openReposSlice.reducer;
