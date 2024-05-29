import { Avatar } from 'flowbite-react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div>
      <Avatar className="justify-start my-2" img={`${user.avatar}`} rounded>
        <div className="space-y-1 font-medium dark:text-white justify-between">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="font-normal">
            {score}
            {' '}
            point
          </p>
        </div>
      </Avatar>
    </div>
  );
}

const leaderboardShape = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardShape,
};

export default LeaderboardItem;
