import { IGitGraph } from 'shared/interfaces/IGitGraph';

export const GetGitLogQueryChannelName = 'get-git-log';

export type GetGitLogQueryChannelRequest = {
  path: string;
  limit: number;
};

export type GetGitLogQueryChannelResponse = {
  graph?: IGitGraph;
  error?: string;
};
