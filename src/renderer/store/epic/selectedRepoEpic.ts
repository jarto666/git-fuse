import { ofType } from 'redux-observable';
import FakeRepositoryService from 'renderer/services/FakeRepositoryService';
import { from, map, catchError, of, switchMap } from 'rxjs';
import {
  getRepositoryInfoRequestAction,
  getRepositoryInfoSuccessAction,
  getRepositoryInfoFailedAction,
} from '../reducer/selectedRepoSlice';
import { IRepositoryDetails } from 'shared/interfaces/IRepositoryDetails';

export const getSelectedRepoEpic = (action$: any) => {
  return action$.pipe(
    ofType(getRepositoryInfoRequestAction),
    switchMap((action: any) => {
      return from(FakeRepositoryService.getById(action.payload.id)).pipe(
        map((response: IRepositoryDetails) => {
          if (response) {
            return getRepositoryInfoSuccessAction(response);
          } else {
            throw response;
          }
        }),
        // takeUntil(action$.pipe(ofType(setSelectedRepoCancelAction))),
        catchError((err) => {
          return of(getRepositoryInfoFailedAction(err));
        })
      );
    })
  );
};
