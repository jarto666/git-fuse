import { styled } from '@mui/material';
import { TreeItem, TreeView, TreeViewProps } from '@mui/lab';

type StyledTreeViewProps =
  | {
      level: number;
    }
  | TreeViewProps;

export const StyledTreeView = styled(TreeView)<StyledTreeViewProps>(
  (_) => `

  padding-top: 3px;

  .MuiTreeItem-group {
    padding-left: 0;
    margin-left: 0;
  }

  .MuiTreeItem-root {
    padding-left: 0;
    margin-left: 0;
  }
`
);

type StyledTreeItemProps = {
  level: number;
} & TreeViewProps;

export const StyledTreeItem = styled(TreeItem)<StyledTreeItemProps>(
  (props: StyledTreeItemProps) => `  
  .MuiTreeItem-content {
    padding-left: ${props.level * 15 + 15}px;
  }

  .MuiTreeItem-label {
    font-size: 14px !important;
  }  
`
);
