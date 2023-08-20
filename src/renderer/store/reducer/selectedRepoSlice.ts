import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { IRepositoryDetails } from 'shared/interfaces/IRepositoryDetails';

const initialState: SelectedRepoStateInterface = {
  repo: undefined,
  isLoading: false,
  isSuccessful: false,
  error: undefined,
};

export const selectedRepoSlice = createSlice({
  name: 'selectedRepository',
  initialState,
  reducers: {
    getRepositoryInfoRequestAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<{ id: string }>
    ) => {
      state.isLoading = true;
      state.error = undefined;
    },
    getRepositoryInfoSuccessAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<IRepositoryDetails>
    ) => {
      state.repo = action.payload;
      state.isLoading = false;
    },
    getRepositoryInfoFailedAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<Error>
    ) => {
      state.isLoading = false;
      state.repo = undefined;
      state.error = { message: action.payload.message };
    },
    getRepositoryInfoCancelAction: (state: SelectedRepoStateInterface) => {
      state.isLoading = false;
    },
  },
});

export const {
  getRepositoryInfoRequestAction,
  getRepositoryInfoSuccessAction,
  getRepositoryInfoFailedAction,
  getRepositoryInfoCancelAction,
} = selectedRepoSlice.actions;

export default selectedRepoSlice.reducer;
