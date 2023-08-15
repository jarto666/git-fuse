import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IpcService } from 'renderer/IPC/IpcService';
import { IRepositoryDetails } from 'renderer/interface/IRepositoryDetails';
import { SelectedRepoStateInterface } from 'renderer/interface/redux/SelectedRepoStateInterface';
import {
  GetRepositoryInfoChannelRequest,
  GetRepositoryInfoChannelResponse,
} from 'shared/IPC/queries/GetRepositoryInfoQuery';

export type RepositoryMainPanelProps = {};

type Props = RepositoryMainPanelProps & React.ComponentPropsWithoutRef<'div'>;

export const RepositoryMainPanel = (props: Props) => {
  let ipc = new IpcService();
  const [token, setToken] = useState<IRepositoryDetails | undefined>(undefined);

  const selectedRepoState = useSelector<any, SelectedRepoStateInterface>(
    (state: any) => state.selectedRepository
  );

  useEffect(() => {
    const getGitBranches = async () => {
      if (!selectedRepoState.repo) {
        return;
      }

      // setToken(bs.repository);
    };
    if (!token) {
      getGitBranches();
    }
  }, []);

  return (
    <div {...props}>
      {selectedRepoState.error ? (
        <span>Error: {selectedRepoState.error.message}</span>
      ) : (
        <>
          <span>Path: {selectedRepoState.repo?.path}</span>
          <ul>
            Local branches:
            {selectedRepoState.repo?.branches.local.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
          <ul>
            Remote branches:
            {selectedRepoState.repo?.branches.remote.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
          <ul>
            Stashes:
            {selectedRepoState.repo?.stashes.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
  return <div {...props}>{selectedRepoState.repo?.path}</div>;
};
