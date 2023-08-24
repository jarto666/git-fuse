import { styled } from '@mui/material/styles';

import { RepositoryDataPanel } from './DataPanel/repositoryDataPanel';
import { RepositoryMainPanel } from './RepositoryMain/repositoryMain';

export namespace Styles {
  export const DataPanel = styled(RepositoryDataPanel)(
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

  export const MainPanel = styled(RepositoryMainPanel)`
    box-sizing: border-box;
    height: 100%;
    flex: 1;
    /* overflow-y: auto; */
  `;
}
