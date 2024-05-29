import { Button, Label, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email :" />
        </div>
        <TextInput id="email" type="email" placeholder="Email" value={email} onChange={setEmail} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password :" />
        </div>
        <TextInput id="password" type="password" placeholder="Password" value={password} onChange={setPassword} required />
      </div>
      <Button gradientDuoTone="purpleToPink" type="button" onClick={() => login({ email, password })}>Submit</Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
