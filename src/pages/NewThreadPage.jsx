import { Card } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import CreateThread from '../components/ThreadInput';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <Card className="max-w-md mx-auto py-2">
      <h2 className="font-bold mx-auto">Tambah diskusi</h2>
      <CreateThread newThread={onAddThread} />
    </Card>
  );
}

export default NewThreadPage;
