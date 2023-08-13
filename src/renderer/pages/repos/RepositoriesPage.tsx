import TopBar from './TopBar/topBar';
import { styled } from '@mui/material';
import { RepositoryActionsPanel } from './RepositoryActions/repositoryActions';
import { RepositoryManager } from './RepositoryManager/repositoryManager';

const StyledRepositoryMainContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledRepositoriesView = styled('div')`
  height: 100%;
  width: 100%;
`;

const RepositoriesPage = () => {
  // const openedReposState = useSelector<any, OpenReposStateInterface>(
  //   (state: any) => state.openRepos
  // );
  return (
    <>
      <StyledRepositoryMainContainer>
        <RepositoryActionsPanel></RepositoryActionsPanel>
        <StyledRepositoriesView>
          <TopBar></TopBar>
          <RepositoryManager></RepositoryManager>
        </StyledRepositoriesView>
      </StyledRepositoryMainContainer>
    </>
  );
};

export default RepositoriesPage;
