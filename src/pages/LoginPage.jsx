import { Button, Card } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Card className="max-w-md mx-auto py-2 my-10">
        <Toaster />
        <h2 className="font-bold mx-auto">Login ke Maridiskus</h2>
        <LoginInput login={onLogin} />
        <figure className="flex flex-row items-center gap-2">
          <p>Didn&apos;t have an account? </p>
          <Link to="/register">
            <motion.button whileHover={{ scale: 1.1 }}>
              <Button size="sm">
                Register
              </Button>
            </motion.button>
          </Link>
        </figure>
      </Card>
    </motion.div>
  );
}

export default LoginPage;
