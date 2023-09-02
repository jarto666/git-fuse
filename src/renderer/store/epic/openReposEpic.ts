import { catchError, from, map, mergeMap, of } from 'rxjs';
import { ofType } from 'redux-observable';
import FakeRepositoryService from 'renderer/services/FakeRepositoryService';
import { IRepository } from 'shared/interfaces/IRepository';
import {
  closeOpenedRepoFailedAction,
  closeOpenedRepoRequestAction,
  closeOpenedRepoSuccessAction,
  getOpenedReposFailedAction,
  getOpenedReposRequestAction,
  getOpenedReposSuccessAction,
  setSelectedRepoFailedAction,
  setSelectedRepoRequestAction,
  setSelectedRepoSuccessAction,
} from '../reducer/openReposSlice';

export const openReposEpic = (action$: any) => {
  return action$.pipe(
    ofType(getOpenedReposRequestAction),
    mergeMap(() =>
      from(FakeRepositoryService.getOpenedRepos()).pipe(
        map((response: IRepository[]) => {
          if (response) {
            return getOpenedReposSuccessAction(response);
          }
          throw response;
        }),
        catchError(() => {
          return of(getOpenedReposFailedAction());
        })
      )
    )
  );
};

export const closeOpenedRepoEpic = (action$: any) => {
  return action$.pipe(
    ofType(closeOpenedRepoRequestAction),
    mergeMap((action: any) => {
      return from(FakeRepositoryService.closeRepo(action.payload.id)).pipe(
        map((response: any) => {
          if (response) {
            return closeOpenedRepoSuccessAction(response);
          }
          throw response;
        }),
        catchError(() => {
          return of(closeOpenedRepoFailedAction());
        })
      );
    })
  );
};

export const setSelectedRepoEpic = (action$: any) => {
  return action$.pipe(
    ofType(setSelectedRepoRequestAction),
    mergeMap((action: any) => {
      return from(FakeRepositoryService.setSelected(action.payload.id)).pipe(
        map((response: any) => {
          if (response) {
            return setSelectedRepoSuccessAction(response);
          }
          throw response;
        }),
        catchError(() => {
          return of(setSelectedRepoFailedAction());
        })
      );
    })
  );
};
