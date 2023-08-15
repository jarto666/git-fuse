// import { Styles as S } from './styles';

import { CircularProgress, styled } from '@mui/material';
import React from 'react';

const SpinnerContainer = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export type RepositoryViewProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

export const RepositoryView = (props: RepositoryViewProps) => {
  return (
    <div {...props}>
      {!props.isLoading ? (
        <>{props.children}</>
      ) : (
        <SpinnerContainer>
          <CircularProgress color="secondary" />
        </SpinnerContainer>
      )}
    </div>
  );
};
