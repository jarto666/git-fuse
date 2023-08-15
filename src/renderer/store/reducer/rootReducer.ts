import openReposSlice from './openReposSlice';
import selectedRepoSlice from './selectedRepoSlice';

const rootReducer = () => {
  return {
    openRepos: openReposSlice,
    selectedRepository: selectedRepoSlice,
  };
};

export default rootReducer;
