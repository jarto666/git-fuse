import { IpcService } from 'renderer/IPC/IpcService';
import { IRepository } from 'shared/interfaces/IRepository';
import { IRepositoryDetails } from 'shared/interfaces/IRepositoryDetails';
import {
  GetRepositoryInfoChannelName,
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
      order: 4,
      name: 'medicine_tracker',
      path: `C:\\SyncSpace\\Projects\\medicine_tracker`,
    },
    {
      id: 'ID4',
      order: 3,
      name: 'training',
      path: `C:\\SyncSpace\\Projects\\test\\training-manual`,
    },
  ];

  static selectedRepo = this.repos[0];

  static getOpenedRepos = () => {
    // FakeRepositoryService.repos = [...FakeRepositoryService.repos].sort(
    //   (a, b) => a.order - b.order
    // );
    const responseData: IRepository[] = FakeRepositoryService.repos;

    return new Promise<IRepository[]>((resolve) => {
      setTimeout(resolve, 0, responseData);
    }).catch((err) => {
      throw new Error(err);
    });
  };

  static closeRepo = (id: string) => {
    FakeRepositoryService.repos = FakeRepositoryService.repos.filter(
      (x) => x.id !== id
    );
    const responseData = FakeRepositoryService.repos;
    return new Promise((resolve) => {
      setTimeout(resolve, 0, responseData);
    }).catch((err) => {
      throw new Error(err);
    });
  };

  static setSelected = (id: string): Promise<IRepository> => {
    const repo = FakeRepositoryService.repos.find((x) => x.id === id);
    return new Promise<IRepository>((resolve) => {
      FakeRepositoryService.selectedRepo = repo!;
      setTimeout(resolve, 0, FakeRepositoryService.selectedRepo);
    }).catch((err) => {
      throw new Error(err);
    });
  };

  static getById = async (id: string): Promise<IRepositoryDetails> => {
    const repo = FakeRepositoryService.repos.find((x) => x.id === id);

    const ipc = new IpcService();
    const response = await ipc.send<
      GetRepositoryInfoChannelRequest,
      GetRepositoryInfoChannelResponse
    >(GetRepositoryInfoChannelName, {
      path: repo!.path,
    });

    return new Promise<IRepositoryDetails>((resolve, reject) => {
      if (response.error) {
        reject(response.error);
      } else {
        setTimeout(resolve, 0, response.repository);
      }
    }).catch((err) => {
      throw new Error(err);
    });
  };
}
