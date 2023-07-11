import openReposSlice from './openReposSlice';

const rootReducer = () => {
  return {
    openRepos: openReposSlice,
  };
};

export default rootReducer;
