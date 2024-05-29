import { useEffect } from 'react';
import { Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import { asyncReceiveThreadDetail } from '../states/detailThread/action';
import { asyncDownvoteThread, asyncNeutralvoteThread, asyncUpvoteThread } from '../states/threads/action';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailThread = useSelector((state) => state.detailThread);
  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpvote = (threadId) => {
    dispatch(asyncUpvoteThread(threadId));
  };

  const onDownvote = (threadId) => {
    dispatch(asyncDownvoteThread(threadId));
  };

  const onNeutralvote = (threadId) => {
    dispatch(asyncNeutralvoteThread(threadId));
  };

  return (
    <Card className="max-w</div>-sm mx-auto md:max-w-xl">
      <ThreadDetail
        threadId={id}
        {...detailThread}
        upvote={onUpvote}
        downvote={onDownvote}
        neutralvote={onNeutralvote}
      />
    </Card>
  );
}

export default DetailPage;
