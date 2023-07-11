import { catchError, from, map, mergeMap, of } from 'rxjs';
import { ofType } from 'redux-observable';
import {
  closeOpenedRepoFailedAction,
  closeOpenedRepoRequestAction,
  closeOpenedRepoSuccessAction,
  getOpenedReposFailedAction,
  getOpenedReposRequestAction,
  getOpenedReposSuccessAction,
} from '../reducer/openReposSlice';
import FakeRepositoryService from 'renderer/services/FakeRepositoryService';
import { IRepository } from 'renderer/interface/IRepository';

export const openReposEpic = (action$: any, state$: any) => {
  return action$.pipe(
    ofType(getOpenedReposRequestAction),
    mergeMap((action: any) =>
      from(FakeRepositoryService.getOpenedRepos()).pipe(
        map((response: IRepository[]) => {
          if (response) {
            return getOpenedReposSuccessAction(response);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          return of(getOpenedReposFailedAction());
        })
      )
    )
  );
};

export const closeOpenedRepoEpic = (action$: any, state$: any) => {
  return action$.pipe(
    ofType(closeOpenedRepoRequestAction),
    mergeMap((action: any) => {
      return from(FakeRepositoryService.closeRepo(action.payload.id)).pipe(
        map((response: any) => {
          if (response) {
            return closeOpenedRepoSuccessAction(response);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          return of(closeOpenedRepoFailedAction());
        })
      );
    })
  );
};
