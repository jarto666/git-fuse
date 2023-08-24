import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { GraphViewer } from './GraphViewer/graphViewer';
import { CommitTable, StyledTableHeader } from './CommitTable/commitTable';
import { styled } from '@mui/material';
import StyledSplit from 'renderer/framework/Split/StyledSplit';

export type RepositoryMainPanelProps = {};

type Props = RepositoryMainPanelProps & React.ComponentPropsWithoutRef<'div'>;

const StyledGraphColumn = styled('div')`
  background-color: #111;
`;

export const RepositoryMainPanel = (props: Props) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  let commits = selectedRepoState.repo && selectedRepoState.repo.commits;

  if (!commits) {
    return <div></div>;
  }

  return (
    <div {...props}>
      {selectedRepoState.error ? (
        <span>Error: {selectedRepoState.error.message}</span>
      ) : (
        <div>
          <StyledSplit lineBar mode="horizontal">
            <StyledGraphColumn>
              <StyledTableHeader>Graph</StyledTableHeader>
              <GraphViewer commits={commits}></GraphViewer>
            </StyledGraphColumn>
            <CommitTable commits={commits}></CommitTable>
          </StyledSplit>
        </div>
      )}
    </div>
  );
};
