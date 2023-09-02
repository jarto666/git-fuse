/* eslint-disable @typescript-eslint/no-empty-interface */
import { styled } from '@mui/material';
import StyledSplit from 'renderer/framework/Split/StyledSplit';
import React, { useContext, useEffect, useRef } from 'react';
import { Subject, debounceTime } from 'rxjs';
import WidthContext, { HeaderWidths } from '../commitTableWidthContext';

const StyledHeader = styled('div')(
  () => `
  align-self: center;
  font-size: 14px;
`
);

const useHeaderResizeSubscription = (
  headersRefMap: Record<string, React.RefObject<HTMLDivElement>>,
  handleResize: (key: string, newWidth: number) => void
) => {
  Object.entries(headersRefMap).forEach((e) => {
    const [key, ref] = e;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === ref.current) {
            handleResize(key, entry.contentRect.width);
          }
        });
      });

      if (ref.current) {
        resizeObserver.observe(ref.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [key, ref]);
  });
};

interface CommitHeadersProps extends React.ComponentPropsWithoutRef<'div'> {}

const CommitHeaders = (props: CommitHeadersProps) => {
  const widthContext = useContext(WidthContext);

  const { className } = props;

  const setHeaderWidths = widthContext?.setHeaderWidths;

  useEffect(() => {
    if (!setHeaderWidths) return undefined;

    const widthChangeSubject = new Subject<{
      headerKey: keyof HeaderWidths;
      newWidth: number;
    }>();

    const subscription = widthChangeSubject
      .pipe(debounceTime(100)) // Adjust the debounce time as needed
      .subscribe(({ headerKey, newWidth }) => {
        setHeaderWidths((prevWidths: HeaderWidths) => ({
          ...prevWidths,
          [headerKey]: newWidth,
        }));
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [setHeaderWidths]);

  const headersRefMap: Record<
    'graphHeader' | 'messageHeader' | 'authorHeader' | 'shaHeader',
    React.RefObject<HTMLDivElement>
  > = {
    graphHeader: useRef<HTMLDivElement>(null),
    messageHeader: useRef<HTMLDivElement>(null),
    authorHeader: useRef<HTMLDivElement>(null),
    shaHeader: useRef<HTMLDivElement>(null),
  };

  useHeaderResizeSubscription(
    headersRefMap,
    (key: string, newWidth: number) => {
      if (!setHeaderWidths) return;
      setHeaderWidths((prevWidths: HeaderWidths) => ({
        ...prevWidths,
        [key]: newWidth,
      }));
    }
  );

  if (!widthContext) {
    return null;
  }

  return (
    <div className={className}>
      <StyledSplit lineBar mode="horizontal" color="#666666">
        <StyledHeader
          ref={headersRefMap.graphHeader}
          style={{
            minWidth: '48px',
            width: '100px',
            textAlign: 'center',
          }}
        >
          Graph
        </StyledHeader>
        <StyledHeader
          ref={headersRefMap.messageHeader}
          style={{
            width: '50%',
            minWidth: '100px',
            textAlign: 'center',
          }}
        >
          Message
        </StyledHeader>
        <StyledHeader
          ref={headersRefMap.messageHeader}
          style={{
            minWidth: '100px',

            width: '20%',
            textAlign: 'center',
          }}
        >
          Author
        </StyledHeader>
        <StyledHeader
          ref={headersRefMap.shaHeader}
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

export default CommitHeaders;
