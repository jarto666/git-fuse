import { styled } from '@mui/material';
import Deblur from '@mui/icons-material/Deblur';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { useSelector } from 'react-redux';
import TopBar from './TopBar/topBar';
import { RepositoryActionsPanel } from './RepositoryActions/repositoryActions';
import { StyledRepositoryManager } from './styles';
import RepositoryView from './RepositoryView/repositoryView';

const StyledRepositoryMainContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledRepositoryView = styled(RepositoryView)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

export const RepositoryActionHome = styled('div')(
  ({ theme }) => `
    height: 40px;
    width: 65px;
    display: flex;
    flex-basis: 65px;
    flex-shrink: 0;
    justify-content: center;
    min-height: 40px;
    padding-top: 2px;
    background-color: ${theme.palette.background.paper};
  `
);

export const HomeIcon = styled(Deblur)(
  (props) => `
    height: 40px;
      width: 30px;
    ':hover': {
      color: ${props.theme.palette.secondary.main},
    }
    `
);

const StyledRepositoriesTopPanel = styled('div')(
  (props) => `
  display: flex;
  flex-direction: row;
  background-color: ${props.theme.palette.background.paper}`
);

const RepositoriesPage = () => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  return (
    <>
      <StyledRepositoryMainContainer>
        <StyledRepositoriesTopPanel>
          <RepositoryActionHome>
            <HomeIcon />
          </RepositoryActionHome>
          <TopBar />
        </StyledRepositoriesTopPanel>
        <StyledRepositoryView isLoading={selectedRepoState.isLoading}>
          <RepositoryActionsPanel />
          {/* <RepositoryManager></RepositoryManager> */}
          <StyledRepositoryManager />
        </StyledRepositoryView>
      </StyledRepositoryMainContainer>
    </>
  );
};

export default RepositoriesPage;
