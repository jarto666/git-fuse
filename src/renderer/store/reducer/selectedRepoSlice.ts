import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IRepository } from 'renderer/interface/IRepository';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';

const initialState: SelectedRepoStateInterface = {
  repo: undefined,
  isLoading: false,
  isSuccessful: false,
  error: {},
};

export const selectedRepoSlice = createSlice({
  name: 'selectedRepository',
  initialState,
  reducers: {
    setSelectedRepoRequestAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<IRepository>
    ) => {
      state.isLoading = true;
    },
    setSelectedRepoSuccessAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<IRepository>
    ) => {
      state.repo = action.payload;
      state.isLoading = false;
    },
    setSelectedRepoFailedAction: (state: SelectedRepoStateInterface) => {
      state.isLoading = false;
    },
    setSelectedRepoCancelAction: (state: SelectedRepoStateInterface) => {
      state.isLoading = false;
    },
  },
});

export const {
  setSelectedRepoRequestAction: getSelectedRepoRequestAction,
  setSelectedRepoSuccessAction: getSelectedRepoSuccessAction,
  setSelectedRepoFailedAction: getSelectedRepoFailedAction,
  setSelectedRepoCancelAction: setSelectedRepoCancelAction,
} = selectedRepoSlice.actions;

export default selectedRepoSlice.reducer;
