import { GitAdapter } from 'main/services/GitAdapter';
import {
  GetRepositoryInfoChannelRequest,
  GetRepositoryInfoChannelResponse,
  GetRepositoryInfoChannelName,
} from '../../../../shared/IPC/queries/GetRepositoryInfoQuery';
import { IpcChannelBase } from '../../ipcChannel';

export class GetRepositoryInfoQueryChannel extends IpcChannelBase<
  GetRepositoryInfoChannelRequest,
  GetRepositoryInfoChannelResponse
> {
  get name(): string {
    return GetRepositoryInfoChannelName;
  }

  protected async handleInternal(
    args: GetRepositoryInfoChannelRequest
  ): Promise<GetRepositoryInfoChannelResponse> {
    try {
      return await GetRepositoryInfoQueryChannelHandler(args);
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  }
}

export const GetRepositoryInfoQueryChannelHandler = async (
  args: GetRepositoryInfoChannelRequest
): Promise<GetRepositoryInfoChannelResponse> => {
  const git = new GitAdapter(args.path);
  git.initialize();

  const localBranches = await git.getBranchesLocal();
  const remoteBranches = await git.getBranchesRemote();
  const stashes = await git.getStashes();
  const path = await git.getPath();

  return {
    repository: {
      branches: {
        local: localBranches,
        remotes: remoteBranches,
      },
      path: path,
      stashes: stashes,
    },
  };
};
