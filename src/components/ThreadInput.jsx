import {
  Button,
  Label,
  TextInput,
  Textarea,
} from 'flowbite-react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CreateThread({ newThread }) {
  const [title, setTitle] = useInput('');
  const [body, setBody] = useInput('');
  const [category, setCategory] = useInput('');

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="text" value="Title :" />
        </div>
        <TextInput id="title" type="text" placeholder="Judul thread" value={title} onChange={setTitle} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="text" value="Category :" />
        </div>
        <TextInput id="category" type="text" value={category} onChange={setCategory} placeholder="general" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="text" value="Body :" />
        </div>
        <Textarea id="comment" type="text" placeholder="Tambah deskripsi diskusi..." value={body} onChange={setBody} required />
      </div>
      <Button gradientDuoTone="purpleToPink" type="button" onClick={() => newThread({ title, body, category })}>Submit</Button>
    </form>
  );
}

CreateThread.propTypes = {
  newThread: PropTypes.func.isRequired,
};

export default CreateThread;
