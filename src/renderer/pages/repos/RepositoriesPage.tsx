import TopBar from './TopBar/topBar';
import { useSelector } from 'react-redux';
import { OpenReposStateInterface } from 'renderer/interface/redux/OpenReposStateInterface';
import { Theme, styled } from '@mui/material';
import Deblur from '@mui/icons-material/Deblur';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DraftsIcon from '@mui/icons-material/Drafts';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import React, { useState } from 'react';
import Split from '@uiw/react-split';

const StyledRepositoryMainContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledRepositoryMenu = styled('div')(
  ({ theme }) => `
  height: 100%;
  width: 65px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border-right: 1px solid ${theme.palette.background.paper};
`
);
const StyledRepositoryMenuHome = styled('div')(
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
const StyledRepositoryMenuList = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledRepositoryMenuListItem = styled('div')(
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

const StyledRepositoriesView = styled('div')`
  height: 100%;
  width: 100%;
`;

const StyledDeblurIcon = styled(Deblur)(
  (props) => `
  height: 40px;
    width: 30px;
  ':hover': {
    color: ${props.theme.palette.secondary.main},
  }
  `
);

const StyledGetAppIcon = styled(GetAppIcon)`
  height: 40px;
  width: 30px;
`;

const StyledFileUploadIcon = styled(FileUploadIcon)`
  height: 40px;
  width: 30px;
`;

const StyledCallSplitIcon = styled(CallSplitIcon)`
  height: 40px;
  width: 30px;
`;

const StyledDraftsIcon = styled(DraftsIcon)`
  height: 40px;
  width: 30px;
`;

const StyledRestartAltIcon = styled(RestartAltIcon)`
  height: 40px;
  width: 30px;
`;

const StyledRepositoryMenuListItemLabel = styled('span')`
  font-size: 14px;
`;

interface RepositoryManagerProps {
  children: React.ReactNode;
}

const RepositoryManager = (props: RepositoryManagerProps) => {
  return <Split lineBar>{props.children}</Split>;
};

const StyledRepositoryManager = styled(RepositoryManager)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledRepositoryDataPanel = styled('div')(
  (props) => `
  box-sizing: border-box;
  height: 100%;
  width: 350px;
  max-width: 700px;
  min-width: 200px;
  font-size: 14px;
  flex: 1 1 auto;

  border-right: 1px solid ${props.theme.palette.background.paper};
`
);

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

interface RepositoryDataPanelGroupProps {
  label: string;
  theme: Theme;
}

const RepositoryDataPanelGroup = (props: RepositoryDataPanelGroupProps) => {
  const [maxHeight, setMaxHeight] = useState('0');

  return (
    <div style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setMaxHeight(maxHeight == '0' ? '100px' : '0')}
      >
        {props.label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledRepositoryDataPanelGroupContent maxHeight={maxHeight}>
        asdf asdf asdf
      </StyledRepositoryDataPanelGroupContent>
    </div>
  );
};

const StyledRepositoryView = styled('div')`
  box-sizing: border-box;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
`;

const RepositoriesPage = () => {
  const openedReposState = useSelector<any, OpenReposStateInterface>(
    (state: any) => state.openRepos
  );
  return (
    <>
      <StyledRepositoryMainContainer>
        <StyledRepositoryMenu>
          <StyledRepositoryMenuHome>
            <StyledDeblurIcon></StyledDeblurIcon>
          </StyledRepositoryMenuHome>
          <StyledRepositoryMenuList>
            <StyledRepositoryMenuListItem>
              <StyledGetAppIcon></StyledGetAppIcon>
              <StyledRepositoryMenuListItemLabel>
                Pull
              </StyledRepositoryMenuListItemLabel>
            </StyledRepositoryMenuListItem>
            <StyledRepositoryMenuListItem>
              <StyledFileUploadIcon></StyledFileUploadIcon>
              <StyledRepositoryMenuListItemLabel>
                Push
              </StyledRepositoryMenuListItemLabel>
            </StyledRepositoryMenuListItem>
            <StyledRepositoryMenuListItem>
              <StyledCallSplitIcon></StyledCallSplitIcon>
              <StyledRepositoryMenuListItemLabel>
                Branch
              </StyledRepositoryMenuListItemLabel>
            </StyledRepositoryMenuListItem>
            <StyledRepositoryMenuListItem>
              <StyledDraftsIcon></StyledDraftsIcon>
              <StyledRepositoryMenuListItemLabel>
                Stash
              </StyledRepositoryMenuListItemLabel>
            </StyledRepositoryMenuListItem>
            <StyledRepositoryMenuListItem>
              <StyledRestartAltIcon></StyledRestartAltIcon>
              <StyledRepositoryMenuListItemLabel>
                Reset
              </StyledRepositoryMenuListItemLabel>
            </StyledRepositoryMenuListItem>
          </StyledRepositoryMenuList>
        </StyledRepositoryMenu>
        <StyledRepositoriesView>
          <TopBar></TopBar>
          <StyledRepositoryManager>
            <StyledRepositoryDataPanel>
              <RepositoryDataPanelGroup label="+ Local"></RepositoryDataPanelGroup>
              <RepositoryDataPanelGroup label="+ Remote"></RepositoryDataPanelGroup>
            </StyledRepositoryDataPanel>
            <StyledRepositoryView>fgjg</StyledRepositoryView>
          </StyledRepositoryManager>
        </StyledRepositoriesView>
      </StyledRepositoryMainContainer>
      {/* <StyledAppBar position="relative">
        <TopBar></TopBar>
      </StyledAppBar>
      <Routes>
        <Route
          path=":id"
          element={
            <>
              <RepositoryContent>
                {openedReposState.selectedRepo &&
                  openedReposState.selectedRepo.name}
              </RepositoryContent>
            </>
          }
        />
      </Routes> */}
    </>
  );
};

export default RepositoriesPage;
