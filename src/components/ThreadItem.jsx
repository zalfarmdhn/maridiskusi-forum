import PropTypes from 'prop-types';
import { Card, Badge } from 'flowbite-react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { postedAt } from '../utils/date';
import VoteButton from './VoteButton';

function ThreadItem({
  thread,
  upvote,
  downvote,
  neutralvote,
}) {
  return (
    <div className="flex justify-center">
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <Card className="w-screen mx-auto mt-2" horizontal>
          <div className="flex flex-wrap gap-2">
            <Badge color="gray" size="sm" href="#">
              #
              {thread.category}
            </Badge>
          </div>
          <Link to={`/threads/${thread.id}`}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{thread.title}</h5>
          </Link>
          <div className="flex gap-1">
            <p className="tracking-tight text-gray-900 dark:text-white">
              {postedAt(thread.createdAt)}
              {' '}
              -
              {' '}
              oleh
            </p>
            <p className="font-bold">
              {thread?.user?.name}
            </p>
          </div>
          <article className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis line-clamp-4">
            {parse(String(thread.body))}
          </article>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <VoteButton
                threadId={thread.id}
                upVotesBy={thread?.upVotesBy}
                downVotesBy={thread?.downVotesBy}
                upvote={upvote}
                downvote={downvote}
                neutralvote={neutralvote}
              />
              <div className="flex items-center gap-2 text-xs">
                <FaRegCommentAlt />
                <p className="text-sm">
                  {thread.totalComments}
                  {' '}
                  comments
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

const ThreadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  thread: PropTypes.shape(ThreadItemShape).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralvote: PropTypes.func.isRequired,
};

export { ThreadItemShape };

export default ThreadItem;
