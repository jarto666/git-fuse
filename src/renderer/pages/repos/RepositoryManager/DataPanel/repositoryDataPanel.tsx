import { TreeItem, TreeView } from '@mui/lab';
import { Collapse, styled } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import { IRemotes } from 'shared/interfaces/IRepositoryDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

const buildTreeView = (node: BranchNode[]) => {
  return node.map((x) => (
    <TreeItem nodeId={x.path} label={x.name} key={x.path}>
      {x.children && buildTreeView(x.children)}
    </TreeItem>
  ));
};

type RepositoryDataPanelLocalBranchesGroupProps = {
  label: string;
  data?: string[];
  expanded?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const RepositoryDataPanelLocalBranchesGroup = (
  props: RepositoryDataPanelLocalBranchesGroupProps
) => {
  const [expanded, setExpanded] = useState(props.expanded);

  const localBranchTree: BranchNode = {
    name: '',
    path: '',
    isFolder: true,
  };
  const localBranches = props.data;

  if (localBranches) {
    for (const branch of localBranches) {
      buildTree(localBranchTree, '', branch);
    }
  }

  return (
    <div className={props.className} style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setExpanded(!expanded)}
      >
        {props.label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledCollapse in={expanded}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {buildTreeView(localBranchTree.children ?? [])}
        </TreeView>
      </StyledCollapse>
    </div>
  );
};

type RepositoryDataPanelRemoteBranchesGroupProps = {
  label: string;
  data?: IRemotes;
  expanded?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const RepositoryDataPanelRemoteBranchesGroup = (
  props: RepositoryDataPanelRemoteBranchesGroupProps
) => {
  const [expanded, setExpanded] = useState(props.expanded);

  const remotes = props.data;
  const remoteTreeMap = {} as { [remote: string]: BranchNode };

  if (remotes) {
    for (const remote in remotes) {
      const rootNode = {
        name: '',
        path: '',
        isFolder: true,
      };
      remoteTreeMap[remote] = rootNode;
      for (const branch of remotes[remote].branches) {
        buildTree(rootNode, '', branch);
      }
    }
  }

  console.log(remoteTreeMap);

  return (
    <div className={props.className} style={{ borderBottom: '1px solid #444' }}>
      <StyledRepositoryDataPanelGroupButton
        onClick={() => setExpanded(!expanded)}
      >
        {props.label}
      </StyledRepositoryDataPanelGroupButton>
      <StyledCollapse in={expanded}>
        {remotes &&
          Object.keys(remotes).map((remote) => (
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId={remote} key={remote} label={remote}>
                {remotes[remote].branches.map((x) => {
                  console.log(remoteTreeMap[remote]);
                  return buildTreeView(remoteTreeMap[remote]?.children ?? []);
                })}
              </TreeItem>
            </TreeView>
          ))}
      </StyledCollapse>
    </div>
  );
};

type RepositoryDataPanelProps = {} & React.ComponentPropsWithoutRef<'div'>;

type BranchNode = {
  path: string;
  name: string;
  children?: BranchNode[];
  isFolder: boolean;
};

const buildTree = (root: BranchNode, prefix: string, path: string) => {
  const pathNodes = path.split('/');
  const currentFolder = pathNodes[0];
  const newPrefix = `${prefix}/${currentFolder}`;

  const existingChild = root.children?.find((x) => x.name === currentFolder);
  if (existingChild === undefined) {
    const node: BranchNode = {
      name: currentFolder,
      path: newPrefix,
      isFolder: pathNodes.length !== 1,
    };

    if (root.children === undefined) {
      root.children = [];
    }

    root.children.push(node);

    if (!node.isFolder) return;

    const newPath = path.substring(path.indexOf('/') + 1);
    buildTree(node, newPrefix, newPath);
  } else {
    const newPath = path.substring(path.indexOf('/') + 1);
    buildTree(existingChild, newPrefix, newPath);
  }
};

export const RepositoryDataPanel = (props: RepositoryDataPanelProps) => {
  const { repo, error } = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  return (
    <div className={props.className}>
      <RepositoryDataPanelLocalBranchesGroup
        label="+ Local"
        data={repo?.branches.local}
      ></RepositoryDataPanelLocalBranchesGroup>
      <RepositoryDataPanelRemoteBranchesGroup
        label="+ Remote"
        data={repo?.branches.remotes}
      ></RepositoryDataPanelRemoteBranchesGroup>
    </div>
  );
};
