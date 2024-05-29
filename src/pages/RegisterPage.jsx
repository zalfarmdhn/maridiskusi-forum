import { Card } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    <Card className="max-w-md mx-auto py-2 my-10">
      <Toaster />
      <a href="/" className="text-sm">← Kembali ke login</a>
      <h2 className="font-bold mx-auto">Daftar ke Maridiskus</h2>
      <RegisterInput register={onRegister} />
    </Card>
  );
}

export default RegisterPage;
