export interface IGitGraph {
  commits: IGitCommit[];
}

export interface IGitCommit {
  id: string;
  parentIds: string[];
  message: string;
}
