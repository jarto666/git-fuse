import { GitAdapter } from '../../../services/GitAdapter';
import {
  GetGitLogQueryChannelRequest,
  GetGitLogQueryChannelResponse,
  GetGitLogQueryChannelName,
} from '../../../../shared/IPC/queries/GetGitGraphQuery';
import { IpcChannelBase } from '../../ipcChannel';
import { IGitCommit, IGitGraph } from 'shared/interfaces/IGitGraph';

export class GetGitLogQueryChannel extends IpcChannelBase<
  GetGitLogQueryChannelRequest,
  GetGitLogQueryChannelResponse
> {
  get name(): string {
    return GetGitLogQueryChannelName;
  }

  protected async handleInternal(
    args: GetGitLogQueryChannelRequest
  ): Promise<GetGitLogQueryChannelResponse> {
    try {
      return await GetGitLogQueryChannelHandler(args);
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  }
}

export const GetGitLogQueryChannelHandler = async (
  args: GetGitLogQueryChannelRequest
): Promise<GetGitLogQueryChannelResponse> => {
  const git = new GitAdapter(args.path);
  git.initialize();

  const graph = await git.getGraph();

  const commitLines: string[] = graph.trim().split('\n');
  const commitGraph: IGitGraph = {
    commits: [],
  };

  commitLines.forEach((line) => {
    if (!line.includes('"')) {
      return;
    }

    const commitString = line.substring(line.indexOf('"') + 1, line.length - 1);
    const commitInfo = JSON.parse(commitString);
    const commit: IGitCommit = {
      id: commitInfo.id,
      message: commitInfo.message,
      parentIds: commitInfo.parentIds.split(' '),
      author: {
        email: commitInfo.author.email,
        name: commitInfo.author.name,
      },
    };

    commitGraph.commits.push(commit);
  });

  return {
    graph: commitGraph,
  };
};
