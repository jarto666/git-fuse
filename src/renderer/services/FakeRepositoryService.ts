import { IpcService } from 'renderer/IPC/IpcService';
import { IRepository } from 'renderer/interface/IRepository';
import { IRepositoryDetails } from 'renderer/interface/IRepositoryDetails';
import {
  GetRepositoryInfoChannelRequest,
  GetRepositoryInfoChannelResponse,
} from 'shared/IPC/queries/GetRepositoryInfoQuery';

export default class FakeRepositoryService {
  static repos = <IRepository[]>[
    {
      id: 'ID2',
      order: 2,
      name: 'MarketPayService',
      path: `C:\\DISKD\\Projects\\MF\\MarketPayService`,
    },
    {
      id: 'ID1',
      order: 1,
      name: 'el-react',
      path: `C:\\SyncSpace\\Projects\\el-react`,
    },
    {
      id: 'ID3',
      order: 3,
      name: 'medicine_tracker',
      path: `C:\\SyncSpace\\Projects\\medicine_tracker`,
    },
  ];

  static selectedRepo = this.repos[0];

  static getOpenedRepos = () => {
    // FakeRepositoryService.repos = [...FakeRepositoryService.repos].sort(
    //   (a, b) => a.order - b.order
    // );
    let responseData: IRepository[] = FakeRepositoryService.repos;

    return new Promise<IRepository[]>((resolve, _) => {
      setTimeout(resolve, 0, responseData);
    }).catch((err) => {
      throw new Error(err);
    });
  };

  static closeRepo = (id: string) => {
    FakeRepositoryService.repos = FakeRepositoryService.repos.filter(
      (x) => x.id != id
    );
    let responseData = FakeRepositoryService.repos;
    return new Promise((resolve, _) => {
      setTimeout(resolve, 0, responseData);
    }).catch((err) => {
      throw new Error(err);
    });
  };

  static setSelected = (id: string): Promise<IRepository> => {
    console.warn(id);

    let repo = FakeRepositoryService.repos.find((x) => x.id === id);
    console.warn(repo);
    return new Promise<IRepository>((resolve, _) => {
      FakeRepositoryService.selectedRepo = repo!;
      setTimeout(resolve, 0, FakeRepositoryService.selectedRepo);
    }).catch((err) => {
      throw new Error(err);
    });
  };

  static getById = async (id: string): Promise<IRepositoryDetails> => {
    let repo = FakeRepositoryService.repos.find((x) => x.id === id);

    let ipc = new IpcService();
    const response = await ipc.send<
      GetRepositoryInfoChannelRequest,
      GetRepositoryInfoChannelResponse
    >('get-git-info', {
      path: repo!.path,
    });

    return new Promise<IRepositoryDetails>((resolve, reject) => {
      if (response.error) {
        reject(response.error);
      } else {
        setTimeout(resolve, 2000, response.repository);
      }
    }).catch((err) => {
      throw new Error(err);
    });
  };
}
