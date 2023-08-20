import { GetGitLogQueryChannelHandler } from './GetGitLogQueryHandler';
import '@testing-library/jest-dom';

describe('index', () => {
  it('should be return', async () => {
    const result = await GetGitLogQueryChannelHandler({
      path: 'C:\\SyncSpace\\Projects\\el-react',
      limit: 1000,
    });

    expect(result).toBeTruthy();
  });
});
