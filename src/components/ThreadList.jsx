import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads,
  upvote,
  downvote,
  neutralvote,
}) {
  return (
    <div className="thread-list">
      {
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            upvote={upvote}
            downvote={downvote}
            neutralvote={neutralvote}
          />
        ))
      }
    </div>
  );
}
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralvote: PropTypes.func.isRequired,
};

export default ThreadList;
