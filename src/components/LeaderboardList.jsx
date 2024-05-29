import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard-list">
      {
        leaderboards.map((leaderboard) => (
          <LeaderboardItem
            key={leaderboard.user.id}
            {...leaderboard}
          />
        ))
      }
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default LeaderboardList;
