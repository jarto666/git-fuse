import { styled } from '@mui/material';
import Deblur from '@mui/icons-material/Deblur';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DraftsIcon from '@mui/icons-material/Drafts';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export namespace Styles {
  export const RepositoryActionsPanel = styled('div')(
    ({ theme }) => `
      height: 100%;
      width: 65px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    
      border-right: 1px solid ${theme.palette.background.paper};
    `
  );
  export const RepositoryActionHome = styled('div')(
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
  export const RepositoryActionList = styled('div')`
    height: 100%;
    width: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  export const RepositoryActionListItem = styled('div')(
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

  export const HomeIcon = styled(Deblur)(
    (props) => `
      height: 40px;
        width: 30px;
      ':hover': {
        color: ${props.theme.palette.secondary.main},
      }
      `
  );

  export const PullIcon = styled(GetAppIcon)`
    height: 40px;
    width: 30px;
  `;

  export const PushIcon = styled(FileUploadIcon)`
    height: 40px;
    width: 30px;
  `;

  export const BranchIcon = styled(CallSplitIcon)`
    height: 40px;
    width: 30px;
  `;

  export const StashIcon = styled(DraftsIcon)`
    height: 40px;
    width: 30px;
  `;

  export const ResetIcon = styled(RestartAltIcon)`
    height: 40px;
    width: 30px;
  `;

  export const RepositoryActionListItemLabel = styled('span')`
    font-size: 14px;
  `;
}
