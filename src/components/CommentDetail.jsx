import { Avatar, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { postedAt } from '../utils/date';

function CommentDetail({ comment }) {
  return (
    <>
      <Avatar className="justify-start" img={comment?.owner?.avatar} rounded>
        <div>{comment?.owner?.name}</div>
        <div className="space-y-1 font-medium dark:text-white">
          <div className="text-sm text-gray-500 dark:text-gray-400">{parser(String(comment?.content))}</div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{postedAt(comment?.createdAt)}</p>
        </div>
      </Avatar>
      <div className="flex gap-2">
        <Button size="xs" color="light" className="flex items-center">
          <div className="flex items-center gap-2">
            <BiUpvote />
            <p className="text-sm">
              {comment?.upVotesBy?.length}
            </p>
          </div>
        </Button>
        <Button size="xs" color="light">
          <div className="flex items-center gap-2">
            <BiDownvote />
            <p className="text-sm">
              {comment?.downVotesBy?.length}
            </p>
          </div>
        </Button>
      </div>
      <hr className="my-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-30 dark:via-neutral-400" />
    </>
  );
}

CommentDetail.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CommentDetail;
