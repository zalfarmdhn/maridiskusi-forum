import { Button } from 'flowbite-react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function VoteButton({
  upVotesBy,
  downVotesBy,
  upvote,
  downvote,
  neutralvote,
  threadId,
}) {
  const authUser = useSelector((state) => state.authUser);
  const isUpvoted = upVotesBy?.includes(authUser.id);
  const isDownvoted = downVotesBy?.includes(authUser.id);

  const onUpvoteClick = (event) => {
    event.stopPropagation();
    if (isUpvoted) {
      neutralvote(threadId);
    } else {
      upvote(threadId);
    }
  };

  const onDownvoteClick = async (event) => {
    event.stopPropagation();
    if (isDownvoted) {
      await neutralvote(threadId);
    } else {
      await downvote(threadId);
    }
  };

  return (
    <div className="flex gap-2">
      <Button size="xs" color={isUpvoted ? 'dark' : 'light'} className="flex items-center" onClick={onUpvoteClick}>
        <div className="flex items-center gap-2">
          <BiUpvote />
          <p className="text-sm">
            {upVotesBy?.length}
            {' '}
            Upvote
          </p>
        </div>
      </Button>
      <Button size="xs" color="light" className="flex items-center" onClick={onDownvoteClick}>
        <div className="flex items-center gap-2">
          <BiDownvote />
          <p className="text-sm">
            {downVotesBy?.length}
            {' '}
            Downvote
          </p>
        </div>
      </Button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralvote: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default VoteButton;
