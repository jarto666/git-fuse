import { IRepositoryDetails } from 'shared/interfaces/IRepositoryDetails';

export const GetRepositoryInfoChannelName = 'get-repository-info';

export type GetRepositoryInfoChannelRequest = {
  path: string;
};

export type GetRepositoryInfoChannelResponse = {
  repository?: IRepositoryDetails;
  error?: string;
};
