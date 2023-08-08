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
      !openedReposState.selectedRepo &&
      openedReposState?.repos &&
      openedReposState?.repos.length > 0
    ) {
      dispatch(setSelectedRepoRequestAction(openedReposState.repos[0]));
    }
  }, [openedReposState.repos]);

  return (
    <>
      {openedReposState.selectedRepo && (
        <StyledTabs
          value={openedReposState.selectedRepo}
          onChange={(
            _: React.SyntheticEvent<Element, Event>,
            value: IRepository
          ) => {
            dispatch(setSelectedRepoRequestAction(value));
            navigate(`/repos/${value.id}`, {
              // relative: 'route',
            });
          }}
        >
          {openedReposState.repos.map((repo: IRepository) => {
            return (
              <StyledTab
                selected={repo === openedReposState.selectedRepo}
                key={repo.id}
                id={`${repo.id}`}
                value={repo}
                label={repo.name}
                onClose={(repo) => {
                  console.log('close tab: ' + repo.id);
                  if (openedReposState.selectedRepo === repo) {
                    dispatch(
                      setSelectedRepoRequestAction(
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
