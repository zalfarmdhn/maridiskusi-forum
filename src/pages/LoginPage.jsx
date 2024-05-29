import { Card } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <Card className="max-w-md mx-auto py-2 my-10">
      <h2 className="font-bold mx-auto">Login ke Maridiskus</h2>
      <LoginInput login={onLogin} />
      <p>Didn&apos;t have an account? </p>
      <Link to="/register">
        Register
      </Link>
    </Card>
  );
}

export default LoginPage;
