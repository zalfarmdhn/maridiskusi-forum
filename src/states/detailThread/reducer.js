import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAILS:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.userId) {
            return {
              ...comment,
              vote: comment.vote === 1 ? 0 : 1,
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.userId) {
            return {
              ...comment,
              vote: comment.vote === -1 ? 0 : -1,
            };
          }
          return comment;
        }),
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
