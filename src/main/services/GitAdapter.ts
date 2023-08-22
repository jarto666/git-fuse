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

  private async _getRawLogByKey(
    key: string
  ): Promise<{ [id: string]: string }> {
    const commitLines = await this._git.raw([
      'log',
      '--all',
      '--date-order',
      `--pretty=format:"%H:${key}"`,
    ]);

    let values: { [id: string]: string } = {};
    commitLines
      .trim()
      .split('\n')
      .forEach((line) => {
        const commitInfo = line.substring(
          line.indexOf('"') + 1,
          line.length - 1
        );

        values[commitInfo.split(':')[0]] = commitInfo.substring(
          commitInfo.indexOf(':') + 1
        );
      });

    return values;
  }

  async _getRemotes(): Promise<string[]> {
    return (await this._git.raw(['remote'])).trim().split('\n');
  }

  async _getHeads(): Promise<HeadsInfo> {
    const localHeadsRaw = await this._git.raw(['show-ref', '--heads']);
    let values: HeadsInfo = {};
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

  // Retrieves one property after another. Can be optimized to return JSON from git log,
  // but problem is that if any value contains quotes - it is hard to reformat JSON to escape them
  async getLog(): Promise<IGitCommit[]> {
    const messages = await this._getRawLogByKey('%s');
    const authorName = await this._getRawLogByKey('%an');
    const authorEmail = await this._getRawLogByKey('%ae');
    const commitDate = await this._getRawLogByKey('%cI');
    const parentIds = await this._getRawLogByKey('%P');

    var heads = await this._getHeads();

    const result: IGitCommit[] = [];

    for (const key in messages) {
      result.push({
        id: key,
        message: messages[key],
        parentIds: parentIds[key].split(' '),
        author: {
          name: authorName[key],
          email: authorEmail[key],
        },
        timestamp: new Date(commitDate[key]),
        heads: heads[key],
      });
    }

    return result;
  }
}

interface HeadsInfo {
  [hash: string]: IGitHeadsInfo;
}
