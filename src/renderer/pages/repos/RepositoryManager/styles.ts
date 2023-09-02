import { styled } from '@mui/material/styles';
import RepositoryMainPanel from './RepositoryMain/repositoryMain';
import RepositoryDataPanel from './DataPanel/repositoryDataPanel';

export const StyledDataPanel = styled(RepositoryDataPanel)(
  (props) => `
    box-sizing: border-box;
    height: 100%;
    width: 350px;
    max-width: 700px;
    min-width: 200px;
    font-size: 14px;
    border-right: 1px solid ${props.theme.palette.background.paper};
  `
);

export const StyledMainPanel = styled(RepositoryMainPanel)`
  box-sizing: border-box;
  height: 100%;
  flex: 1;
  /* overflow-y: auto; */
`;
