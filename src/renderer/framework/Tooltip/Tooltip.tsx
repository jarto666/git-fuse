import { styled } from '@mui/material';
import React from 'react';

export type TooltipProps = {
  children: React.ReactNode;
  width: string;
};

type Props = TooltipProps & React.ComponentPropsWithoutRef<'div'>;

const Tooltip = (props: Props) => {
  return (
    <>
      {props.children}

      <div className={props.className}></div>
    </>
  );
};

const StyledTooltip = styled(Tooltip)(
  (props) => `
    width: ${props.width};
    position: absolute;
    background-color: ${props.theme.palette.secondary.main};
`
);

export default StyledTooltip;
