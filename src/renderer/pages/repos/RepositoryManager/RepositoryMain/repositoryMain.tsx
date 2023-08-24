import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { GraphViewer } from './GraphViewer/graphViewer';
import { CommitTable } from './CommitTable/commitTable';
import { styled } from '@mui/material';
import StyledSplit from 'renderer/framework/Split/StyledSplit';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import WidthContext, { HeaderWidths } from './commitTableWidthContext';
import { Subject, debounce, debounceTime } from 'rxjs';

export type RepositoryMainPanelProps = {};

type Props = RepositoryMainPanelProps & React.ComponentPropsWithoutRef<'div'>;

const StyledGraphColumn = styled('div')`
  background-color: #111;
`;

const StyledHeader = styled('div')(
  (_) => `
  align-self: center;
  font-size: 14px;
`
);

type CommitHeadersProps = {} & React.ComponentPropsWithoutRef<'div'>;

const CommitHeaders = (props: CommitHeadersProps) => {
  const widthContext = useContext(WidthContext);
  if (!widthContext) {
    return null;
  }

  const { setHeaderWidths } = widthContext;

  const handleHeaderResize = (
    headerKey: keyof HeaderWidths,
    newWidth: number
  ) => {
    setHeaderWidths((prevWidths) => ({
      ...prevWidths,
      [headerKey]: newWidth,
    }));
  };

  const observeHeaderResize = (headerKey: keyof HeaderWidths) => {
    const headerRef = useRef<HTMLDivElement>(null);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === headerRef.current) {
          handleHeaderResize(headerKey, entry.contentRect.width);
        }
      }
    });

    useEffect(() => {
      if (headerRef.current) {
        resizeObserver.observe(headerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [headerKey]);

    return headerRef;
  };

  const widthChangeSubject = new Subject<{
    headerKey: keyof HeaderWidths;
    newWidth: number;
  }>();

  useEffect(() => {
    const subscription = widthChangeSubject
      .pipe(debounceTime(100)) // Adjust the debounce time as needed
      .subscribe(({ headerKey, newWidth }) => {
        handleHeaderResize(headerKey, newWidth);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const graphHeaderRef = observeHeaderResize('graphHeader');
  const messageHeaderRef = observeHeaderResize('messageHeader');
  const authorHeaderRef = observeHeaderResize('authorHeader');
  const shaHeaderRef = observeHeaderResize('shaHeader');

  return (
    <div className={props.className}>
      <StyledSplit lineBar mode="horizontal" color="#666666">
        <StyledHeader
          ref={graphHeaderRef}
          style={{
            minWidth: '48px',
            width: '100px',
            textAlign: 'center',
          }}
        >
          Graph
        </StyledHeader>
        <StyledHeader
          ref={messageHeaderRef}
          style={{
            width: '50%',
            minWidth: '100px',
            textAlign: 'center',
          }}
        >
          Message
        </StyledHeader>
        <StyledHeader
          ref={authorHeaderRef}
          style={{
            minWidth: '100px',

            width: '20%',
            textAlign: 'center',
          }}
        >
          Author
        </StyledHeader>
        <StyledHeader
          ref={shaHeaderRef}
          style={{
            // width: '100px',
            flex: 1,
            minWidth: '100px',
            textAlign: 'center',
          }}
        >
          SHA
        </StyledHeader>
      </StyledSplit>
    </div>
  );
};

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

export const RepositoryMainPanel = (props: Props) => {
  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  let commits = selectedRepoState.repo && selectedRepoState.repo.commits;

  if (!commits) {
    return <div></div>;
  }

  const [headerWidths, setHeaderWidths] = useState<HeaderWidths>({
    graphHeader: 66,
    messageHeader: 100,
    authorHeader: 150,
    shaHeader: 100,
  });

  return (
    <WidthContext.Provider value={{ headerWidths, setHeaderWidths }}>
      <div {...props}>
        {selectedRepoState.error ? (
          <span>Error: {selectedRepoState.error.message}</span>
        ) : (
          <div>
            <StyledHeaders></StyledHeaders>
            <StyledBody>
              <StyledGraphColumn
                style={{ width: `${headerWidths.graphHeader}px` }}
              >
                <GraphViewer commits={commits}></GraphViewer>
              </StyledGraphColumn>
              <CommitTable commits={commits}></CommitTable>
            </StyledBody>
          </div>
        )}
      </div>
    </WidthContext.Provider>
  );
};
