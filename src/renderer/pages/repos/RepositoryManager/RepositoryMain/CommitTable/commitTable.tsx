import { styled } from '@mui/material';
import { useContext } from 'react';
import { IGitCommit } from 'shared/interfaces/IGitGraph';
import WidthContext from '../commitTableWidthContext';

type CommitTableProps = {
  commits: IGitCommit[];
};

type Props = CommitTableProps & React.ComponentPropsWithoutRef<'div'>;

const StyledCommitTable = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, auto);
  height: fit-content;
  font-size: 13px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
`;

const CommitTable = (props: Props) => {
  const widthContext = useContext(WidthContext);
  if (!widthContext) {
    return null;
  }

  const { headerWidths } = widthContext;
  const { commits, className } = props;

  return (
    <StyledCommitTable className={className}>
      {commits &&
        commits.map((commit) => (
          <StyledCommitTableRow key={commit.id}>
            <StyledCommitTableCell
              style={{ width: `${headerWidths.messageHeader}px` }}
            >
              {commit.message}
            </StyledCommitTableCell>
            <StyledCommitTableCell
              style={{ width: `${headerWidths.authorHeader}px` }}
            >
              {`${commit.author.name} <${commit.author.email}>`}
            </StyledCommitTableCell>
            <StyledCommitTableCell
              style={{ width: `${headerWidths.shaHeader}px` }}
            >
              {commit.id.substring(0, 6)}
            </StyledCommitTableCell>
          </StyledCommitTableRow>
        ))}
    </StyledCommitTable>
  );
};

export default CommitTable;
