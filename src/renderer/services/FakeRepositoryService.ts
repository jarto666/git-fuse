import { IRepository } from 'renderer/interface/IRepository';

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
      name: 'dart-tutorial',
      path: `C:\\SyncSpace\\Projects\\dart-tutorial`,
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

  static getById = (id: string): Promise<IRepository> => {
    let responseData = FakeRepositoryService.repos.find((x) => x.id === id);
    return new Promise<IRepository>((resolve, _) => {
      setTimeout(resolve, 2000, responseData);
    }).catch((err) => {
      throw new Error(err);
    });
  };
}
