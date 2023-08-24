import { styled } from '@mui/material';
import Split, { SplitProps } from '@uiw/react-split';
import { ReactNode } from 'react';

interface StyledSplitProps {
  children: ReactNode[];
}

const StyledSplit = styled(
  ({ children, ...splitProps }: StyledSplitProps & SplitProps) => (
    <Split {...splitProps}>{children}</Split>
  )
)(
  (_) => `
  .w-split-line-bar div::after {
    background-color: transparent;
  }
`
);

export default StyledSplit;
