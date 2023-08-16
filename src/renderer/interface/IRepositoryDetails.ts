export interface IRemote {
  url: string;
  branches: string[];
}

export interface IRepositoryDetails {
  path: string;
  branches: {
    local: string[];
    remotes: IRemote[];
  };
  stashes: string[];
}
