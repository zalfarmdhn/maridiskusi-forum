import {
  Badge,
  Button,
  Label,
  Textarea,
  Avatar,
} from 'flowbite-react';
import parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import CommentDetail from './CommentDetail';
import { postedAt } from '../utils/date';
import { asyncAddComment } from '../states/detailThread/action';
import useInput from '../hooks/useInput';
import VoteButton from './VoteButton';

function ThreadDetail({
  threadId,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  upvote,
  downvote,
  neutralvote,
}) {
  const [content, setContent] = useInput('');

  const dispatch = useDispatch();

  const addComment = async ({ content }) => {
    try {
      dispatch(asyncAddComment({ threadId, content }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="thread-body flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <Badge color="gray" size="sm" href="#">
          #
          {category}
        </Badge>
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white my-2" href="#thread-id">
        {title}
      </h5>
      <div className="flex gap-1">
        <p className="tracking-tight text-gray-900 dark:text-white">
          {postedAt(createdAt)}
          {' '}
          oleh
        </p>
        <Avatar size="xs" className="justify-start" img={owner?.avatar} rounded>
          <div className="font-small dark:text-white">
            {owner?.name}
          </div>
        </Avatar>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {parser(String(body))}
      </p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <VoteButton
            threadId={threadId}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            upvote={upvote}
            downvote={downvote}
            neutralvote={neutralvote}
          />
        </div>
      </div>
      <form className="submit-comment">
        <div className="max-w-xxl">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Tambahkan komentar.." />
          </div>
          <Textarea id="comment" value={content} onChange={setContent} placeholder="" required rows={4} />
        </div>
        <div className="flex justify-end">
          <Button className="mt-2 w-full p-0" color="blue" onClick={() => addComment({ content })}>Submit</Button>
        </div>
      </form>
      <p className="font-medium">
        Komentar (
        {comments?.length}
        )
      </p>
      {comments?.map((comment) => (
        <CommentDetail
          key={comment?.id}
          comment={comment}
        />
      ))}
    </div>
  );
}

ThreadDetail.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  neutralvote: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default ThreadDetail;
