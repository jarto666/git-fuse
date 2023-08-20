import { IRemotes, IStash } from 'shared/interfaces/IRepositoryDetails';
import simpleGit, { SimpleGit } from 'simple-git';

export class GitAdapter {
  private _git!: SimpleGit;
  private _repositoryPath: string;

  constructor(repositoryPath: string) {
    this._repositoryPath = repositoryPath;
  }

  async initialize() {
    this._git = simpleGit(this._repositoryPath);
  }

  // ---------------- Branches

  async getBranchesLocal(): Promise<string[]> {
    return (await this._git.branchLocal()).all;
  }

  async getBranchesRemote(): Promise<IRemotes> {
    const remotes = (await this._git.getRemotes()).map((x) => x.name);
    const remoteUrls = <any>{};
    for (const remote of remotes) {
      remoteUrls[remote] = (
        await this._git.getConfig(`remote.${remote}.url`)
      ).value;
    }
    const remoteBranches = (await this._git.branch(['-r'])).all;

    return Object.assign(
      {},
      ...remotes.map((remote) => ({
        [remote]: {
          branches: remoteBranches
            .filter((branch) => branch.startsWith(`${remote}/`))
            .map((br) => br.substring(br.indexOf('/') + 1)),
          url: remoteUrls[remote],
        },
      }))
    );
  }

  // ---------------- Stashes

  async getStashes(): Promise<IStash[]> {
    const stashes = (await this._git.stashList()).all;

    return stashes.map(
      (x) =>
        <IStash>{
          id: x.hash,
          message: x.message,
        }
    );
  }

  // ---------------- Repo info

  async getPath(): Promise<string> {
    return await this._git.revparse(['--show-toplevel']);
  }

  async getGraph(): Promise<any> {
    return await this._git.raw([
      'log',
      '--all',
      '--graph',
      '--pretty=format:"{ "id": "%H", "parentIds": "%P", "date": "%cI", "author": {"email": "%ae", "name": "%an"},"message": "%s"}"',
    ]);
  }
}
