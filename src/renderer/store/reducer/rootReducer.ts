import openRepos from './openReposSlice';
import selectedRepository from './selectedRepoSlice';

const rootReducer = () => {
  return {
    openRepos,
    selectedRepository,
  };
};

export default rootReducer;
