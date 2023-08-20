import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export type TopBarProps = {};

const TopBar = () => {
  const navigate = useNavigate();

  const openedReposState = useSelector<any, OpenReposStateInterface>(
    (state: any) => state.openRepos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOpenedReposRequestAction());
  }, []);

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
  }, [openedReposState.repos]);

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
            navigate(`/repos/${value.id}`, {
              // relative: 'route',
            });
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
                onClose={(repo) => {
                  if (openedReposState.selectedRepository === repo) {
                    dispatch(
                      getRepositoryInfoRequestAction(
                        openedReposState.repos[
                          openedReposState.repos.findIndex((x) => x === repo) -
                            1
                        ]
                      )
                    );
                  }

                  dispatch(closeOpenedRepoRequestAction({ id: repo.id }));
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
