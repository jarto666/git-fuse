import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StyledTab from 'renderer/framework/Tabs/StyledTab';
import StyledTabs from 'renderer/framework/Tabs/StyledTabs';
import { IRepository } from 'renderer/interface/IRepository';
import { OpenReposStateInterface } from 'renderer/interface/redux/OpenReposStateInterface';
import {
  getOpenedReposRequestAction,
  closeOpenedRepoRequestAction,
  setSelectedRepoRequestAction,
} from 'renderer/store/reducer/openReposSlice';
import {
  getSelectedRepoRequestAction,
  setSelectedRepoCancelAction,
} from 'renderer/store/reducer/selectedRepoSlice';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';

const TopBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname);

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
      dispatch(setSelectedRepoCancelAction());
      dispatch(getSelectedRepoRequestAction(openedReposState.repos[0]));
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
            dispatch(setSelectedRepoCancelAction());
            dispatch(getSelectedRepoRequestAction(value));
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
                  console.log('close tab: ' + repo.id);
                  if (openedReposState.selectedRepository === repo) {
                    dispatch(
                      getSelectedRepoRequestAction(
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
