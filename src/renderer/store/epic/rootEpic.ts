import { combineEpics } from 'redux-observable';
import {
  closeOpenedRepoEpic,
  openReposEpic,
  setSelectedRepoEpic,
} from './openReposEpic';
import { getSelectedRepoEpic } from './selectedRepoEpic';

export const rootEpic = combineEpics(
  // open repos
  openReposEpic,
  closeOpenedRepoEpic,
  setSelectedRepoEpic,

  // selected repo
  getSelectedRepoEpic
);
