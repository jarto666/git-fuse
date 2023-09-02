import { ofType } from 'redux-observable';
import FakeRepositoryService from 'renderer/services/FakeRepositoryService';
import { from, map, catchError, of, switchMap } from 'rxjs';
import { IRepositoryDetails } from 'shared/interfaces/IRepositoryDetails';
import {
  getRepositoryInfoRequestAction,
  getRepositoryInfoSuccessAction,
  getRepositoryInfoFailedAction,
} from '../reducer/selectedRepoSlice';

export const getSelectedRepoEpic = (action$: any) => {
  return action$.pipe(
    ofType(getRepositoryInfoRequestAction),
    switchMap((action: any) => {
      return from(FakeRepositoryService.getById(action.payload.id)).pipe(
        map((response: IRepositoryDetails) => {
          if (response) {
            return getRepositoryInfoSuccessAction(response);
          }
          throw response;
        }),
        catchError((err) => {
          return of(getRepositoryInfoFailedAction(err));
        })
      );
    })
  );
};
