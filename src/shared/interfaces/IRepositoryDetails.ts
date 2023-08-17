export interface IRemotes {
  [name: string]: IRemote;
}

export interface IRemote {
  url: string;
  branches: string[];
}

export interface IRepositoryDetails {
  path: string;
  branches: {
    local: string[];
    remotes: {
      [name: string]: IRemote;
    };
  };
  stashes: IStash[];
}

export interface IStash {
  id: string;
  message: string;
}
