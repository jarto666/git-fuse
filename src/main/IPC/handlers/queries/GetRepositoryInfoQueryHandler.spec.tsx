import { GetRepositoryInfoQueryChannelHandler } from './GetRepositoryInfoQueryHandler';
import '@testing-library/jest-dom';

describe('index', () => {
  it('should be return', async () => {
    const result = await GetRepositoryInfoQueryChannelHandler({
      path: 'C:\\SyncSpace\\Projects\\el-react',
    });

    expect(result).toBeTruthy();
  });
});
