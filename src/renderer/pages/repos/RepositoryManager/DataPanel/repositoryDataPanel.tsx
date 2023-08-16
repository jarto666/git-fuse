import { Collapse, styled } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';

const StyledRepositoryDataPanelGroupButton = styled('button')(
  (props) => `
    background-color: ${props.theme.actionArea.background};
    color: ${props.theme.palette.text.primary};
    cursor: pointer;
    padding: 3px;
    height: 30px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 14px;
  
    :hover {
      background-color: ${props.theme.actionArea.greyedOut};
    }
  `
);

const StyledDataItemContent = styled('div')(
  ({ theme }) => `
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 3px 3px 3px 6px;
  font-size: 12px;

  :hover {
    background-color: ${theme.actionArea.greyedOut};
    cursor: pointer;
  }
`
);

const StyledCollapse = styled(Collapse)`
  /* padding-left: 15px; */
`;

type RepositoryDataPanelGroupProps = {
  label: string;
  data?: string[];
  expanded?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const RepositoryDataPanelGroup = (props: RepositoryDataPanelGroupProps) => {
  const [expanded, setExpanded] = useState(props.expanded);

  return (
    <div className={props.className} style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setExpanded(!expanded)}
      >
        {props.label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledCollapse in={expanded}>
        {props.data &&
          props.data.map((x) => (
            <>
              <StyledDataItemContent>{x}</StyledDataItemContent>
            </>
          ))}
      </StyledCollapse>
    </div>
  );
};

type RepositoryDataPanelProps = {} & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryDataPanel = (props: RepositoryDataPanelProps) => {
  const { repo, error } = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  return (
    <div className={props.className}>
      <RepositoryDataPanelGroup
        label="+ Local"
        data={repo?.branches.local}
      ></RepositoryDataPanelGroup>
      <RepositoryDataPanelGroup
        label="+ Remote"
        data={repo?.branches.remotes?.flatMap((x) => x.branches)}
      ></RepositoryDataPanelGroup>
    </div>
  );
};
