import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAILS: 'RECEIVE_THREAD_DETAILS',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAILS,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpvoteActionCreator(threadId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
    },
  };
}

function toggleDownvoteActionCreator(threadId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch(clearThreadDetailActionCreator());
      const detailThread = await api.getThreadDetails(threadId);
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment(content, threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createCommentOnThread(content, threadId);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncAddComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpvoteActionCreator,
  toggleDownvoteActionCreator,
};
