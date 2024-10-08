import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Badge, Button, Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncDownvoteThread, asyncNeutralvoteThread, asyncUpvoteThread } from '../states/threads/action';

function HomePage({ authUser }) {
  const [categorySelect, setCategorySelect] = React.useState(null);
  const threads = useSelector((state) => state.threads) || [];
  const users = useSelector((state) => state.users) || [];
  // const authUser = useSelector(state => state.authUser);
  const uniqueCategories = [...new Set(threads.map((thread) => thread?.category))];

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onCategorySelect = (category) => {
    setCategorySelect(category);
  };

  const onUpvote = (threadId) => {
    dispatch(asyncUpvoteThread(threadId));
  };

  const onDownvote = (threadId) => {
    dispatch(asyncDownvoteThread(threadId));
  };

  const onNeutralvote = (threadId) => {
    dispatch(asyncNeutralvoteThread(threadId));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread?.ownerId),
    authUser,
  }));

  return (
    <>
      <Toaster />
      <section className="homepage">
        {/* Add Thread */}
        <Card className="flex flex-col items-center max-w</div>-sm mx-auto" horizontal>
          <div>
            <Link to="/new">
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
              >
                <Button>
                  Add Thread
                </Button>
              </motion.button>
            </Link>
          </div>
          <h3>Kategori Populer</h3>
          <div className="flex flex-wrap gap-2">
            <Badge color="gray" size="sm" href="#" onClick={() => onCategorySelect(null)}>
              All
            </Badge>
            {uniqueCategories.map((category) => (
              <Badge key={category} color="gray" size="sm" href="#" onClick={() => onCategorySelect(category)}>
                #
                {category}
              </Badge>
            ))}
          </div>
        </Card>
        <ThreadList
          threads={
            categorySelect
              ? threads.filter((thread) => thread.category === categorySelect)
              : threadList
          }
          upvote={onUpvote}
          downvote={onDownvote}
          neutralvote={onNeutralvote}
          authUser={authUser}
        />
      </section>
    </>
  );
}

HomePage.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomePage;
