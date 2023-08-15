import { ofType } from 'redux-observable';
import FakeRepositoryService from 'renderer/services/FakeRepositoryService';
import { from, map, catchError, of, switchMap } from 'rxjs';
import {
  getSelectedRepoRequestAction,
  getSelectedRepoSuccessAction,
  getSelectedRepoFailedAction,
} from '../reducer/selectedRepoSlice';
import { IRepository } from 'renderer/interface/IRepository';

export const getSelectedRepoEpic = (action$: any) => {
  console.warn('setSelectedRepoEpic');
  return action$.pipe(
    ofType(getSelectedRepoRequestAction),
    switchMap((action: any) => {
      return from(FakeRepositoryService.getById(action.payload.id)).pipe(
        map((response: IRepository) => {
          if (response) {
            return getSelectedRepoSuccessAction(response);
          } else {
            throw response;
          }
        }),
        // takeUntil(action$.pipe(ofType(setSelectedRepoCancelAction))),
        catchError((err) => {
          return of(getSelectedRepoFailedAction());
        })
      );
    })
  );
};
