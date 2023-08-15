import { useEffect, useState } from 'react';
import { IpcService } from 'renderer/IPC/IpcService';
import {
  GetGitInfoChannelRequest,
  GetGitInfoChannelResponse,
} from 'shared/IPC/queries/GetRepositoryInfoQuery';
import { BranchSummary } from 'simple-git';

export type RepositoryViewPanelProps = {};

type Props = RepositoryViewPanelProps & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryViewPanel = (props: Props) => {
  let ipc = new IpcService();
  const [token, setToken] = useState<BranchSummary | undefined>(undefined);

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

  return <div {...props}>{token?.all}</div>;
};
