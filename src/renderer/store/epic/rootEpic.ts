import { combineEpics } from 'redux-observable';
import {
  closeOpenedRepoEpic,
  openReposEpic,
  setSelectedRepoEpic,
} from './openReposEpic';

export const rootEpic = combineEpics(
  openReposEpic,
  closeOpenedRepoEpic,
  setSelectedRepoEpic
);
