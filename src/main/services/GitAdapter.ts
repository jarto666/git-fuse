import { IGitCommit, IGitHeadsInfo } from 'shared/interfaces/IGitGraph';
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
      // TODO: Parallelize
      remoteUrls[remote] = // eslint-disable-next-line no-await-in-loop
        (await this._git.getConfig(`remote.${remote}.url`)).value;
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
    return this._git.revparse(['--show-toplevel']);
  }

  readonly COMMIT_INFO_DELIMITER: string = '.2[K~E&jnp+$F3@fy#KRzfg';

  async _getRemotes(): Promise<string[]> {
    return (await this._git.raw(['remote'])).trim().split('\n');
  }

  async _getHeads(): Promise<HeadsInfo> {
    const localHeadsRaw = await this._git.raw(['show-ref', '--heads']);
    const values: HeadsInfo = {};
    localHeadsRaw
      .trim()
      .split('\n')
      .forEach((line) => {
        const [hash, ref] = line.split(' ').filter((x) => x !== '');
        values[hash] = values[hash] ?? {};
        const branch = ref.substring(11);
        values[hash][branch] = {
          local: true,
          remotes: [],
        };
      });

    const remotes = await this._getRemotes();
    for (const remote of remotes) {
      // TODO: Parallelize
      // eslint-disable-next-line no-await-in-loop
      const remoteHeadsRaw = await this._git.raw([
        'ls-remote',
        '--heads',
        remote,
      ]);
      remoteHeadsRaw
        .trim()
        .split('\n')
        .forEach((line) => {
          const [hash, ref] = line.split('\t').filter((x) => x !== '');
          values[hash] = values[hash] ?? {};
          const branch = ref.substring(11);
          values[hash][branch] = values[hash][branch] ?? {
            local: false,
            remotes: [],
          };
          values[hash][branch].remotes.push(remote);
        });
    }

    return values;
  }

  async _getCommits(): Promise<IGitCommit[]> {
    // var heads = await this._getHeads();

    const requestData = ['%H', '%P', '%cI', '%ae', '%an', '%s'];
    const commitLines = await this._git.raw([
      'log',
      '--all',
      '--date-order',
      `--pretty=format:"${requestData.join(this.COMMIT_INFO_DELIMITER)}"`,
    ]);

    const result: IGitCommit[] = [];
    commitLines
      .trim()
      .split('\n')
      .forEach((line) => {
        const [
          id,
          parentIdsString,
          commitDate,
          authorEmail,
          authorName,
          subject,
        ] = line
          .substring(line.indexOf('"') + 1, line.length - 1)
          .split(this.COMMIT_INFO_DELIMITER);

        result.push({
          id,
          message: subject,
          parentIds: parentIdsString
            .trim()
            .split(' ')
            .filter((x) => x),
          author: {
            name: authorName,
            email: authorEmail,
          },
          timestamp: new Date(commitDate),
          // heads: heads[id],
        });
      });

    return result;
  }
  async getLog(): Promise<IGitCommit[]> {
    return this._getCommits();
  }
}

interface HeadsInfo {
  [hash: string]: IGitHeadsInfo;
}
