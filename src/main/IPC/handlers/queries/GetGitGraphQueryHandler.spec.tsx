import { GetGitGraphQueryChannelHandler } from './GetGitGraphQueryHandler';
import '@testing-library/jest-dom';

describe('index', () => {
  it('should be return', async () => {
    const result = await GetGitGraphQueryChannelHandler({
      path: 'C:\\SyncSpace\\Projects\\el-react',
    });

    expect(result).toBeTruthy();
  });
});
