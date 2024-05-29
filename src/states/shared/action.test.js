import {
  it,
  vi,
  describe,
  beforeEach,
  afterEach,
  expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

/**
 * skenario test
 *
 * - asyncPopulateUsersAndTalks thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadResponse = [
  {
    id: 'thread-1',
    title: 'Thread Test 1',
    body: 'Thread Body 1',
    category: 'general',
    createdAt: '2022-06-21T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUserResponse = [
  {
    id: 'user-1',
    name: 'User 1',
    email: 'user@gmail.com',
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeErrorResponse = new Error('Failed to fetch data');

describe('asyncPopulateUsersAndThreads thunk', () => {
  // backup dan merestore
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data successfully fetched', async () => {
    // arrange
    // stub implement
    api.getAllUsers = () => Promise.resolve(fakeUserResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // act
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and alert when data failed to fetch', async () => {
    // arrange
    // stub
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
