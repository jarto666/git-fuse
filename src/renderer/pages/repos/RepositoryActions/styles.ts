import { styled } from '@mui/material';
import Deblur from '@mui/icons-material/Deblur';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DraftsIcon from '@mui/icons-material/Drafts';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const StyledRepositoryActionsPanel = styled('div')(
  ({ theme }) => `
      height: 100%;
      width: 65px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    
      border-right: 1px solid ${theme.palette.background.paper};
    `
);

export const StyledRepositoryActionHome = styled('div')(
  ({ theme }) => `
      height: 40px;
      display: flex;
      justify-content: center;
      min-height: 40px;
      padding-top: 2px;
    
      border-bottom: 1px solid #828282;
      border-bottom: 1px solid ${theme.palette.background.paper};
      background-color: ${theme.palette.background.paper};
    `
);

export const StyledRepositoryActionList = styled('div')`
  height: 100%;
  width: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledRepositoryActionListItem = styled('div')(
  ({ theme }) => `
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 55px;
      align-items: center;
    
      :hover {
        background-color: ${theme.actionArea.greyedOut};
        cursor: pointer;
      }
    `
);

export const StyledHomeIcon = styled(Deblur)(
  (props) => `
      height: 40px;
        width: 30px;
      ':hover': {
        color: ${props.theme.palette.secondary.main},
      }
      `
);

export const StyledPullIcon = styled(GetAppIcon)`
  height: 40px;
  width: 30px;
`;

export const StyledPushIcon = styled(FileUploadIcon)`
  height: 40px;
  width: 30px;
`;

export const StyledBranchIcon = styled(CallSplitIcon)`
  height: 40px;
  width: 30px;
`;

export const StyledStashIcon = styled(DraftsIcon)`
  height: 40px;
  width: 30px;
`;

export const StyledResetIcon = styled(RestartAltIcon)`
  height: 40px;
  width: 30px;
`;

export const StyledRepositoryActionListItemLabel = styled('span')`
  font-size: 14px;
`;
