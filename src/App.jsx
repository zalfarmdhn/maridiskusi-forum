import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import './index.css';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NewThreadPage from './pages/NewThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Loading from './components/Loading';

function App() {
  const authUser = useSelector((state) => state.authUser) || null;
  const isPreload = useSelector((state) => state.isPreload) || false;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <main>
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <Navbar signOut={onSignout} authUser={authUser} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage authUser={authUser} />} />
            <Route path="/new" element={<NewThreadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
