import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE: 'TOGGLE_UPVOTE',
  TOGGLE_DOWNVOTE: 'TOGGLE_DOWNVOTE',
  TOGGLE_NEUTRALVOTE: 'TOGGLE_NEUTRALVOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpvoteActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE,
    payload: {
      userId,
    },
  };
}

function toggleDownvoteActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE,
    payload: {
      userId,
    },
  };
}

function toggleNeutralvoteActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_NEUTRALVOTE,
    payload: {
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      toast.success('Thread created successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpvoteThread(threadId) {
  return async (dispatch) => {
    try {
      const thread = await api.toggleUpvote(threadId);
      dispatch(toggleUpvoteActionCreator(thread));
      toast.success('Upvoted successfully');
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownvoteThread(threadId) {
  return async (dispatch) => {
    try {
      const thread = await api.toggleDownvote(threadId);
      dispatch(toggleDownvoteActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralvoteThread(threadId) {
  return async (dispatch) => {
    try {
      const thread = await api.toggleNeutralvote(threadId);
      dispatch(toggleNeutralvoteActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpvoteActionCreator,
  toggleDownvoteActionCreator,
  toggleNeutralvoteActionCreator,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralvoteThread,
  asyncAddThread,
};
