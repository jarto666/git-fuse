import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IpcService } from 'renderer/IPC/IpcService';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import {
  GetGitInfoChannelRequest,
  GetGitInfoChannelResponse,
} from 'shared/IPC/queries/GetRepositoryInfoQuery';
import { BranchSummary } from 'simple-git';

export type RepositoryMainPanelProps = {};

type Props = RepositoryMainPanelProps & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryMainPanel = (props: Props) => {
  let ipc = new IpcService();
  const [token, setToken] = useState<BranchSummary | undefined>(undefined);

  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  useEffect(() => {
    const getGitBranches = async () => {
      const bs = await ipc.send<
        GetGitInfoChannelRequest,
        GetGitInfoChannelResponse
      >('get-git-info', {});
      setToken(bs.answer);
    };
    if (!token) {
      getGitBranches();
    }
  }, []);

  return <div {...props}>{selectedRepoState.repo?.name}</div>;
};
