import { styled } from '@mui/material';
import { useState } from 'react';

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

const StyledRepositoryDataPanelGroupContent = styled('div')<{
  maxHeight: string;
}>(
  (props) => `
    transition: max-height 0.2s ease-out;
    max-height: ${props.maxHeight};
    overflow: hidden;
  `
);

type RepositoryDataPanelGroupProps = {
  label: string;
} & React.ComponentPropsWithoutRef<'div'>;

const RepositoryDataPanelGroup = (props: RepositoryDataPanelGroupProps) => {
  const [maxHeight, setMaxHeight] = useState('0');

  return (
    <div {...props} style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setMaxHeight(maxHeight == '0' ? '100px' : '0')}
      >
        {props.label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledRepositoryDataPanelGroupContent maxHeight={maxHeight}>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </StyledRepositoryDataPanelGroupContent>
    </div>
  );
};

type RepositoryDataPanelProps = {} & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryDataPanel = (props: RepositoryDataPanelProps) => {
  return (
    <div {...props}>
      <RepositoryDataPanelGroup label="+ Local"></RepositoryDataPanelGroup>
      <RepositoryDataPanelGroup label="+ Remote"></RepositoryDataPanelGroup>
    </div>
  );
};
