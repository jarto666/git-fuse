// import { Styles as S } from './styles';

import { CircularProgress, styled } from '@mui/material';
import React from 'react';

const SpinnerContainer = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

type RepositoryViewProps = {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
};

const RepositoryView = (props: RepositoryViewProps) => {
  const { className, isLoading, children } = props;

  return (
    <div className={className}>
      {!isLoading ? (
        <>{children}</>
      ) : (
        <SpinnerContainer>
          <CircularProgress color="secondary" />
        </SpinnerContainer>
      )}
    </div>
  );
};

RepositoryView.defaultProps = {
  className: null,
};

export default RepositoryView;
