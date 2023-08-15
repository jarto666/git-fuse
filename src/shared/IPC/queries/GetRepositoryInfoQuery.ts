import { BranchSummary } from 'simple-git';

export type GetGitInfoChannelRequest = {};

export type GetGitInfoChannelResponse = {
  answer: BranchSummary;
};
