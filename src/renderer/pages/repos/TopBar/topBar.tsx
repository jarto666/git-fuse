import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StyledTab from 'renderer/framework/Tabs/StyledTab';
import StyledTabs from 'renderer/framework/Tabs/StyledTabs';
import { IRepository } from 'shared/interfaces/IRepository';
import { OpenReposStateInterface } from 'renderer/interface/redux/OpenReposStateInterface';
import {
  getOpenedReposRequestAction,
  closeOpenedRepoRequestAction,
  setSelectedRepoRequestAction,
} from 'renderer/store/reducer/openReposSlice';
import { getRepositoryInfoRequestAction } from 'renderer/store/reducer/selectedRepoSlice';

const TopBar = () => {
  const openedReposState = useSelector<any, OpenReposStateInterface>(
    (state: any) => state.openRepos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOpenedReposRequestAction());
  }, [dispatch]);

  useEffect(() => {
    if (
      !openedReposState.selectedRepository &&
      openedReposState?.repos &&
      openedReposState?.repos.length > 0
    ) {
      dispatch(setSelectedRepoRequestAction(openedReposState.repos[0]));
      dispatch(
        getRepositoryInfoRequestAction({ id: openedReposState.repos[0].id })
      );
    }
  }, [dispatch, openedReposState.repos, openedReposState.selectedRepository]);

  return (
    <>
      {openedReposState.selectedRepository && (
        <StyledTabs
          value={openedReposState.selectedRepository}
          onChange={(
            _: React.SyntheticEvent<Element, Event>,
            value: IRepository
          ) => {
            dispatch(setSelectedRepoRequestAction(value));
            dispatch(getRepositoryInfoRequestAction({ id: value.id }));
          }}
        >
          {openedReposState.repos.map((repo: IRepository) => {
            return (
              <StyledTab
                selected={repo === openedReposState.selectedRepository}
                key={repo.id}
                id={`${repo.id}`}
                value={repo}
                label={repo.name}
                onClose={(closedRepo) => {
                  if (openedReposState.selectedRepository === closedRepo) {
                    const currentRepoIndex = openedReposState.repos.findIndex(
                      (x) => x === closedRepo
                    );
                    const newRepo =
                      openedReposState.repos[
                        currentRepoIndex === 0
                          ? currentRepoIndex + 1
                          : currentRepoIndex - 1
                      ];
                    dispatch(setSelectedRepoRequestAction(newRepo));
                    dispatch(
                      getRepositoryInfoRequestAction({ id: newRepo.id })
                    );
                  }

                  dispatch(closeOpenedRepoRequestAction({ id: closedRepo.id }));
                }}
              />
            );
          })}
        </StyledTabs>
      )}
    </>
  );
};

export default TopBar;
