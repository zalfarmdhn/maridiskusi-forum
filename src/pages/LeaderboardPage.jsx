import React from 'react';
import { Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Card className="mx-auto" horizontal>
      <h5 className="font-bold">Pengguna Aktif</h5>
      <LeaderboardList leaderboards={leaderboards} />
    </Card>
  );
}

export default LeaderboardPage;
