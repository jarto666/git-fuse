import { IpcChannelBase } from '../ipcChannel';
import { simpleGit, CleanOptions, BranchSummary } from 'simple-git';

export type GetGitInfoChannelRequest = {};

export type GetGitInfoChannelResponse = {
  answer: BranchSummary;
};

export class GetGitInfoChannel extends IpcChannelBase<
  GetGitInfoChannelRequest,
  GetGitInfoChannelResponse
> {
  get name(): string {
    return 'get-git-info';
  }

  protected async handleInternal(
    args: GetGitInfoChannelRequest
  ): Promise<GetGitInfoChannelResponse> {
    let branches = await simpleGit(
      'C:\\SyncSpace\\Projects\\el-react'
    ).branchLocal();

    const res: GetGitInfoChannelResponse = {
      answer: branches,
    };
    return res;
  }
}
