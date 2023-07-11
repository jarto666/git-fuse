import { IRepository } from 'renderer/interface/IRepository';

export default class FakeRepositoryService {
  static repos = <IRepository[]>[
    {
      id: '1',
      name: 'MarketPayService',
      path: `C:\\DISKD\\Projects\\MF\\MarketPayService`,
    },
    {
      id: '2',
      name: 'el-react',
      path: `C:\\SyncSpace\\Projects\\el-react`,
    },
    {
      id: '3',
      name: 'dart-tutorial',
      path: `C:\\SyncSpace\\Projects\\dart-tutorial`,
    },
  ];

  static getOpenedRepos = () => {
    let responseData = FakeRepositoryService.repos;

    return new Promise((resolve, _) => {
      setTimeout(resolve, 1000, responseData);
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
}
