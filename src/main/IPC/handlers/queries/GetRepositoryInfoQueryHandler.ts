import {
  GetRepositoryInfoChannelRequest as GetRepositoryInfoQueryRequest,
  GetRepositoryInfoChannelResponse as GetRepositoryInfoQueryResponse,
} from 'shared/IPC/queries/GetRepositoryInfoQuery';
import { IpcChannelBase } from '../../ipcChannel';
import { SimpleGit, simpleGit } from 'simple-git';
import { IRemote } from 'renderer/interface/IRepositoryDetails';

export class GetRepositoryInfoQueryChannel extends IpcChannelBase<
  GetRepositoryInfoQueryRequest,
  GetRepositoryInfoQueryResponse
> {
  get name(): string {
    return 'get-git-info';
  }

  protected async handleInternal(
    args: GetRepositoryInfoQueryRequest
  ): Promise<GetRepositoryInfoQueryResponse> {
    let git: SimpleGit;
    try {
      git = await simpleGit(args.path);
      const localBranches = (await git.branchLocal()).all;
      const remoteBranches = (await git.branch(['-r'])).all;
      const path = await git.revparse(['--show-toplevel']);
      const stashes = (await git.stashList()).all.map((x) => x.message);
      const remotes = await git.getRemotes();
      const originUrl = await git.getConfig('remote.origin.url');

      const res: GetRepositoryInfoQueryResponse = {
        repository: {
          branches: {
            local: localBranches,
            remotes: [],
          },
          path,
          stashes,
        },
      };
      return res;
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  }
}
