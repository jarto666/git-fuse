export interface IGitGraph {
  commits: IGitCommit[];
}

export interface IGitCommitAuthor {
  email: string;
  name: string;
}

export interface IGitHeadsInfo {
  [branch: string]: {
    local: boolean;
    remotes: string[];
  };
}

export interface IGitCommit {
  id: string;
  parentIds: string[];
  message: string;
  author: IGitCommitAuthor;
  timestamp: Date;
  heads?: IGitHeadsInfo;
}
