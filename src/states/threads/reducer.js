import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_UPVOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.userId) {
          return {
            ...thread,
            vote: thread.vote === 1 ? 0 : 1,
          };
        }
        return thread;
      });
    case ActionType.TOGGLE_DOWNVOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.userId) {
          return {
            ...thread,
            vote: thread.vote === -1 ? 0 : -1,
          };
        }
        return thread;
      });
    case ActionType.TOGGLE_NEUTRALVOTE:
      return threads.map((thread) => {
        if (thread.id === action.payload.userId) {
          return {
            ...thread,
            vote: thread.vote === 1 || -1 ? 0 : 0,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
