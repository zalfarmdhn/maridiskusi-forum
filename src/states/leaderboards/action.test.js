import {
  it,
  vi,
  describe,
  beforeEach,
  afterEach,
  expect,
} from 'vitest';
import api from '../../utils/api';
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action';

/**
 * skenario test
 * - asyncReceiveLeaderboards thunk
 * - should dispatch leaderboard correctly when data fetching success
 * - should dispatch and return failed when data fetching failed
 */

const fakeLeaderboards = [
  {
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'user-2',
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 50,
  },
];

const fakeErrorResponse = new Error('Failed to fetch data');

describe('asyncReceiveLeaderboards thunk', () => {
  // backup
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  it('should dispatch leaderboard correctly when data fetching success', async () => {
    // arrange
    // stub
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboards);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboards));
  });

  it('should dispatch and return failed when data fetching failed', async () => {
    // arrange
    // stub
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // alert
    window.alert = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
