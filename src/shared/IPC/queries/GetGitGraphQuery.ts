import { IGitGraph } from 'shared/interfaces/IGitGraph';

export const GetGitGraphQueryChannelName = 'get-git-graph';

export type GetGitGraphQueryChannelRequest = {
  path: string;
};

export type GetGitGraphQueryChannelResponse = {
  graph?: IGitGraph;
  error?: string;
};
