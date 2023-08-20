import { GitAdapter } from '../../../services/GitAdapter';
import {
  GetGitGraphQueryChannelRequest,
  GetGitGraphQueryChannelResponse,
  GetGitGraphQueryChannelName,
} from '../../../../shared/IPC/queries/GetGitGraphQuery';
import { IpcChannelBase } from '../../ipcChannel';
import { IGitGraph } from 'shared/interfaces/IGitGraph';

export class GetGitGraphQueryChannel extends IpcChannelBase<
  GetGitGraphQueryChannelRequest,
  GetGitGraphQueryChannelResponse
> {
  get name(): string {
    return GetGitGraphQueryChannelName;
  }

  protected async handleInternal(
    args: GetGitGraphQueryChannelRequest
  ): Promise<GetGitGraphQueryChannelResponse> {
    try {
      return await GetGitGraphQueryChannelHandler(args);
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  }
}

export const GetGitGraphQueryChannelHandler = async (
  args: GetGitGraphQueryChannelRequest
): Promise<GetGitGraphQueryChannelResponse> => {
  const git = new GitAdapter(args.path);
  git.initialize();

  const graph = await git.getGraph();

  const commitLines: string[] = graph.trim().split('\n');
  const commitGraph: IGitGraph = {
    commits: [],
  };

  const regex = /"([^"]*)"/;

  commitLines.forEach((line) => {
    const match = line.match(regex);
    if (!match) {
      return;
    }

    const commitInfo = match[1];
    const commitInfoParts = commitInfo.split(':');
    const commitHash = commitInfoParts[0];
    const commitParents = commitInfoParts[1];
    const message = commitInfo.substring(
      commitHash.length + commitParents.length + 2
    );

    commitGraph.commits.push({
      id: commitHash,
      parentIds: commitParents.split(' '),
      message: message,
    });
  });

  return {
    graph: commitGraph,
  };
};
