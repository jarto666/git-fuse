import { IRepositoryDetails } from 'renderer/interface/IRepositoryDetails';

export type GetRepositoryInfoChannelRequest = {
  path: string;
};

export type GetRepositoryInfoChannelResponse = {
  repository?: IRepositoryDetails;
  error?: string;
};
