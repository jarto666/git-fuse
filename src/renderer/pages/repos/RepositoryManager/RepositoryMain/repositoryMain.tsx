/* eslint-disable @typescript-eslint/no-empty-interface */
import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { styled } from '@mui/material';
import React, { useState } from 'react';
import WidthContext, { HeaderWidths } from './commitTableWidthContext';
import CommitTable from './CommitTable/commitTable';
import CommitHeaders from './CommitTable/commitTableHeaders';
import GraphViewer from './GraphViewer/graphViewer';

const StyledGraphColumn = styled('div')`
  background-color: #111;
`;

const StyledHeaders = styled(CommitHeaders)`
  background-color: #1e1e1e;
  height: 25px;
  margin-bottom: 5px;
`;

const StyledBody = styled('div')`
  background-color: #111;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export interface RepositoryMainPanelProps
  extends React.ComponentPropsWithoutRef<'div'> {}

const RepositoryMainPanel = (props: RepositoryMainPanelProps) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  const commits = selectedRepoState.repo && selectedRepoState.repo.commits;
  const { className } = props;

  const [headerWidths, setHeaderWidths] = useState<HeaderWidths>({
    graphHeader: 66,
    messageHeader: 100,
    authorHeader: 150,
    shaHeader: 100,
  });

  if (!commits) return <></>;

  return (
    <>
      <WidthContext.Provider value={{ headerWidths, setHeaderWidths }}>
        <div className={className}>
          {selectedRepoState.error ? (
            <span>Error: {selectedRepoState.error.message}</span>
          ) : (
            <div>
              <StyledHeaders />
              <StyledBody>
                <StyledGraphColumn
                  style={{ width: `${headerWidths.graphHeader}px` }}
                >
                  <GraphViewer commits={commits} />
                </StyledGraphColumn>
                <CommitTable commits={commits} />
              </StyledBody>
            </div>
          )}
        </div>
      </WidthContext.Provider>
    </>
  );
};

export default RepositoryMainPanel;
