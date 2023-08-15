import {
  GetGitInfoChannelRequest as GetRepositoryInfoQueryRequest,
  GetGitInfoChannelResponse as GetRepositoryInfoQueryResponse,
} from 'shared/IPC/queries/GetRepositoryInfoQuery';
import { IpcChannelBase } from '../../ipcChannel';
import { simpleGit } from 'simple-git';

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
    let branches = await simpleGit(
      'C:\\SyncSpace\\Projects\\el-react'
    ).branchLocal();

    const res: GetRepositoryInfoQueryResponse = {
      answer: branches,
    };
    return res;
  }
}
