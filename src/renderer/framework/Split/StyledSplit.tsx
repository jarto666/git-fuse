import { styled } from '@mui/material';
import Split, { SplitProps } from '@uiw/react-split';
import { ReactNode } from 'react';

interface StyledSplitProps {
  children: ReactNode[];
  color?: string;
}

const StyledSplit = styled(
  ({ children, ...splitProps }: StyledSplitProps & SplitProps) => (
    <Split {...splitProps}>{children}</Split>
  )
)(
  (props) => `
  .w-split-line-bar div::after {
    background-color: ${props.color || 'transparent'};
  }
`
);

export default StyledSplit;
