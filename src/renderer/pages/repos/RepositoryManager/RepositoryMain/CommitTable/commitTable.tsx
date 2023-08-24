import { styled } from '@mui/material';
import { IGitCommit } from 'shared/interfaces/IGitGraph';

type CommitTableProps = {
  commits: IGitCommit[];
};

type Props = CommitTableProps & React.ComponentPropsWithoutRef<'div'>;

const StyledCommitTable = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, auto);
  height: fit-content;
  font-size: 13px;
  width: 100%;
  background-color: #111;
`;

const StyledCommitTableRow = styled('div')`
  display: contents;
  height: 20px;

  :hover {
    background-color: #a8a8a8;
  }
`;

const StyledCommitTableCell = styled('div')`
  height: 20px;
`;

const StyledTableHeaders = styled('div')`
  display: contents;
  height: 20px;
`;

export const StyledTableHeader = styled('div')`
  height: 20px;
  background-color: #050505;
  font-size: 13px;
`;

export const CommitTable = (props: Props) => {
  return (
    <StyledCommitTable className={props.className}>
      <StyledTableHeaders>
        <StyledTableHeader>Message</StyledTableHeader>
        <StyledTableHeader>Author Name</StyledTableHeader>
        <StyledTableHeader>SHA</StyledTableHeader>
      </StyledTableHeaders>
      {props.commits &&
        props.commits.map((commit) => (
          <StyledCommitTableRow>
            <StyledCommitTableCell>{commit.message}</StyledCommitTableCell>
            <StyledCommitTableCell>{commit.author.name}</StyledCommitTableCell>
            <StyledCommitTableCell>
              {commit.id.substring(0, 6)}
            </StyledCommitTableCell>
          </StyledCommitTableRow>
        ))}
    </StyledCommitTable>
  );
};
