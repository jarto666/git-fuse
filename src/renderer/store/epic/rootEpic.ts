import { combineEpics } from 'redux-observable';
import { closeOpenedRepoEpic, openReposEpic } from './openReposEpic';

export const rootEpic = combineEpics(openReposEpic, closeOpenedRepoEpic);
