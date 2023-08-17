import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IRepository } from 'shared/interfaces/IRepository';
import { OpenReposStateInterface } from 'renderer/interface/redux/OpenReposStateInterface';

const initialState: OpenReposStateInterface = {
  repos: [],
  isLoading: false,
  isSuccessful: false,
  error: undefined,
  selectedRepository: undefined,
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
      state.repos = action.payload.slice().sort((a, b) => a.order - b.order);
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
      state.repos = action.payload.slice().sort((a, b) => a.order - b.order);
      state.isLoading = false;
      state.isSuccessful = true;
    },
    closeOpenedRepoFailedAction(state: OpenReposStateInterface) {
      state.isSuccessful = false;
    },

    setSelectedRepoRequestAction: (
      state: OpenReposStateInterface,
      action: PayloadAction<IRepository>
    ) => {},
    setSelectedRepoSuccessAction: (
      state: OpenReposStateInterface,
      action: PayloadAction<IRepository>
    ) => {
      state.selectedRepository = action.payload;
    },
    setSelectedRepoFailedAction: (state: OpenReposStateInterface) => {},
  },
});

export const {
  getOpenedReposRequestAction,
  getOpenedReposSuccessAction,
  getOpenedReposFailedAction,
  closeOpenedRepoRequestAction,
  closeOpenedRepoSuccessAction,
  closeOpenedRepoFailedAction,
  setSelectedRepoRequestAction,
  setSelectedRepoSuccessAction,
  setSelectedRepoFailedAction,
} = openReposSlice.actions;

export default openReposSlice.reducer;
