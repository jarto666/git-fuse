import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IRepositoryDetails } from 'renderer/interface/IRepositoryDetails';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';

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
    setSelectedRepoRequestAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<{ id: string }>
    ) => {
      state.isLoading = true;
      state.error = undefined;
    },
    setSelectedRepoSuccessAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<IRepositoryDetails>
    ) => {
      state.repo = action.payload;
      state.isLoading = false;
    },
    setSelectedRepoFailedAction: (
      state: SelectedRepoStateInterface,
      action: PayloadAction<Error>
    ) => {
      state.isLoading = false;
      state.repo = undefined;
      state.error = { message: action.payload.message };
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
