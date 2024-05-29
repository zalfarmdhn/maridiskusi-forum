import { describe, expect, it } from "vitest";
import leaderboardsReducer from "./reducer";

/**
 * Test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 * - should return the initial state when given by unknown action
 * - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 */

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toBe(initialState);
  });

  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
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
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
