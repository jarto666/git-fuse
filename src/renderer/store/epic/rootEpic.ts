import { combineEpics } from 'redux-observable';
import {
  closeOpenedRepoEpic,
  openReposEpic,
  setSelectedRepoEpic,
} from './openReposEpic';
import { getSelectedRepoEpic } from './selectedRepoEpic';

const rootEpic = combineEpics(
  // open repos
  openReposEpic,
  closeOpenedRepoEpic,
  setSelectedRepoEpic,

  // selected repo
  getSelectedRepoEpic
);

export default rootEpic;
