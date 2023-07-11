import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StyledAppBar from 'renderer/framework/AppBar/StyledAppBar';
import StyledTab from 'renderer/framework/Tabs/StyledTab';
import StyledTabs from 'renderer/framework/Tabs/StyledTabs';
import { IRepository } from 'renderer/interface/IRepository';
import { OpenReposStateInterface } from 'renderer/interface/redux/OpenReposStateInterface';
import {
  closeOpenedRepoRequestAction,
  getOpenedReposRequestAction,
} from 'renderer/store/reducer/openReposSlice';

const RepoTabs = () => {
  const openedReposState = useSelector<any, OpenReposStateInterface>(
    (state: any) => state.openRepos
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOpenedReposRequestAction());
  }, [openedReposState.repos]);

  const [selectedTab, setSelectedTab] = useState('');

  useEffect(() => {
    if (
      !selectedTab &&
      openedReposState?.repos &&
      openedReposState?.repos.length > 0
    ) {
      setSelectedTab(openedReposState.repos[0].id);
    }
  }, [openedReposState.repos]);

  return (
    <>
      {selectedTab && (
        <StyledTabs
          value={selectedTab}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            value: any
          ) => {
            setSelectedTab(value);
          }}
        >
          {openedReposState.repos.map((repo: IRepository) => {
            return (
              <StyledTab
                id={repo.id}
                key={repo.id}
                selected={repo.id == selectedTab}
                value={repo.id}
                label={repo.name}
                onClose={(tabId) => {
                  console.log('close tab: ' + tabId);
                  dispatch(closeOpenedRepoRequestAction({ id: tabId }));
                }}
              />
            );
          })}
        </StyledTabs>
      )}
    </>
  );
};

const RepositoriesPage = () => {
  return (
    <>
      <StyledAppBar>
        <RepoTabs></RepoTabs>
      </StyledAppBar>
    </>
  );
};

export default RepositoriesPage;
