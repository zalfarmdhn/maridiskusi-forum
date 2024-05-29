import { Button, Label, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name :" />
        </div>
        <TextInput id="name" type="text" placeholder="Farhan" value={name} onChange={setName} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Email :" />
        </div>
        <TextInput id="email" type="email" placeholder="farhan@gmail.com" value={email} onChange={setEmail} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Password :" />
        </div>
        <TextInput id="password" type="password" value={password} onChange={setPassword} required placeholder="Password" />
      </div>
      <Button gradientDuoTone="purpleToPink" type="button" onClick={() => register({ name, email, password })}>Submit</Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
