import { describe, expect, it } from "vitest";
import threadsReducer from "./reducer";

/**
* test scenario for threadsReducer
*
* - threadsReducers function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREADS action
*  - should return the talks with the new talk when given by ADD_THREAD action
*
*/

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toBe(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: "thread-1",
            title: "Thread Test 1",
            body: "Thread Body 1",
            category: "general",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "user-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: "thread-2",
            title: "Thread Test 2",
            body: "Thread Body 2",
            category: "general",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "user-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new threads when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'New Thread 1',
        body: 'New Thread Body 1',
        category: 'general',
        createdAt: '2022-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'New Thread 2',
          body: 'New Thread Body 2',
          category: 'general',
          createdAt: '2022-06-21T07:00:00.000Z',
          ownerId: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});
