import { Collapse, styled } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { IRemotes } from 'shared/interfaces/IRepositoryDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  StyledTreeItem,
  StyledTreeView,
} from 'renderer/framework/TreeView/StyledTreeView';

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

const StyledCollapse = styled(Collapse)`
  /* padding-left: 15px; */
`;

const buildTree = (
  root: BranchNode,
  prefix: string,
  path: string,
  level: number
) => {
  const pathNodes = path.split('/');
  const currentFolder = pathNodes[0];
  const newPrefix = `${prefix}/${currentFolder}`;

  const existingChild = root.children?.find((x) => x.name === currentFolder);
  if (existingChild === undefined) {
    const node: BranchNode = {
      name: currentFolder,
      path: newPrefix,
      isFolder: pathNodes.length !== 1,
      level,
    };

    if (root.children === undefined) {
      root.children = [];
    }

    root.children.push(node);

    if (!node.isFolder) return;

    const newPath = path.substring(path.indexOf('/') + 1);
    buildTree(node, newPrefix, newPath, level + 1);
  } else {
    const newPath = path.substring(path.indexOf('/') + 1);
    buildTree(existingChild, newPrefix, newPath, level + 1);
  }
};

const buildTreeView = (node: BranchNode[]) => {
  return node.map((x) => (
    <StyledTreeItem nodeId={x.path} label={x.name} key={x.path} level={x.level}>
      {x.children && buildTreeView(x.children)}
    </StyledTreeItem>
  ));
};

type RepositoryDataPanelLocalBranchesGroupProps = {
  label: string;
  data?: string[];
  expanded?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const RepositoryDataPanelLocalBranchesGroup = ({
  className,
  label,
  data = [],
  expanded = false,
}: RepositoryDataPanelLocalBranchesGroupProps) => {
  const [isExpanded, setExpanded] = useState(expanded);

  const localBranchTree: BranchNode = {
    name: '',
    path: '',
    isFolder: true,
    level: -1,
  };
  const localBranches = data;

  if (localBranches) {
    localBranches.forEach((branch) => {
      buildTree(localBranchTree, '', branch, 0);
    });
  }

  return (
    <div className={className} style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setExpanded(!isExpanded)}
      >
        {label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledCollapse in={isExpanded}>
        <StyledTreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {buildTreeView(localBranchTree.children ?? [])}
        </StyledTreeView>
      </StyledCollapse>
    </div>
  );
};

RepositoryDataPanelLocalBranchesGroup.defaultProps = {
  data: null,
  expanded: false,
};

type RepositoryDataPanelRemoteBranchesGroupProps = {
  label: string;
  data?: IRemotes;
  expanded?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const RepositoryDataPanelRemoteBranchesGroup = (
  props: RepositoryDataPanelRemoteBranchesGroupProps
) => {
  const { expanded, data, label, className } = props;
  const [isExpanded, setExpanded] = useState(expanded);

  const remotes = data;
  const remoteTreeMap = {} as { [remote: string]: BranchNode };

  if (remotes) {
    Object.keys(remotes).forEach((remote) => {
      const rootNode = {
        name: '',
        path: '',
        isFolder: true,
        level: -1,
      } as BranchNode;
      remoteTreeMap[remote] = rootNode;
      remotes[remote].branches.forEach((branch) => {
        buildTree(rootNode, '', branch, 1);
      });
    });
  }

  return (
    <div className={className} style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setExpanded(!isExpanded)}
      >
        {label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledCollapse in={isExpanded}>
        {remotes &&
          Object.keys(remotes).map((remote) => (
            <StyledTreeView
              key={remote}
              disableSelection
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <StyledTreeItem
                nodeId={remote}
                key={remote}
                label={remote}
                level={0}
              >
                {buildTreeView(remoteTreeMap[remote]?.children ?? [])}
              </StyledTreeItem>
            </StyledTreeView>
          ))}
      </StyledCollapse>
    </div>
  );
};

RepositoryDataPanelRemoteBranchesGroup.defaultProps = {
  data: null,
  expanded: false,
};

const DataPanelHeaderLabel = styled(
  (props: React.ComponentPropsWithoutRef<'div'>) => (
    <div className={props.className}>{props.children}</div>
  )
)`
  align-self: center;
`;

type RepositoryDataPanelProps = React.ComponentPropsWithoutRef<'div'>;

type BranchNode = {
  level: number;
  path: string;
  name: string;
  children?: BranchNode[];
  isFolder: boolean;
};

type DataPanelHeaderProps = {
  label: string;
} & React.ComponentPropsWithoutRef<'div'>;
const StyledDataPanelHeader = styled((props: DataPanelHeaderProps) => (
  <div className={props.className}>
    <DataPanelHeaderLabel>{props.label}</DataPanelHeaderLabel>
  </div>
))`
  background-color: #1e1e1e;
  height: 25px;
  font-size: 14px;
  display: flex;
  padding-left: 5px;
  margin-bottom: 5px;
`;

const RepositoryDataPanel = (props: RepositoryDataPanelProps) => {
  const { repo } = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  const { className } = props;

  return (
    <div className={className}>
      <StyledDataPanelHeader label="Data panel" />
      <RepositoryDataPanelLocalBranchesGroup
        expanded
        label="+ Local"
        data={repo?.branches.local}
      />
      <RepositoryDataPanelRemoteBranchesGroup
        label="+ Remote"
        data={repo?.branches.remotes}
      />
    </div>
  );
};

export default RepositoryDataPanel;
