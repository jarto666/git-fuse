export interface IRepositoryDetails {
  path: string;
  branches: {
    local: string[];
    remote: string[];
  };
  stashes: string[];
}
