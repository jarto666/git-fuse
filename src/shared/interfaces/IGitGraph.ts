export interface IGitGraph {
  commits: IGitCommit[];
}

export interface IGitCommitAuthor {
  email: string;
  name: string;
}

export interface IGitCommit {
  id: string;
  parentIds: string[];
  message: string;
  author: IGitCommitAuthor;
}
