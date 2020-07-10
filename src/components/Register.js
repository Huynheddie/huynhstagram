import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import userService from '../services/user';
import loginService from '../services/login';
import postService from '../services/posts';

const Register = ({ setErrorMessage }) => {
  const history = useHistory();
  const [name, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await userService.register({
        username, name, password,
      });
      // setErrorMessage(null);
      // history.push('/');
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user),
      );
      postService.setToken(user.token);
      setErrorMessage(null);
      history.push('/');
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <Card centered>
      <Card.Content>
        <h2>Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Field>
            <label htmlFor='name-input'>Full name</label>
            <Input id='name-input' value={name} onChange={({ target }) => setFullName(target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='username-input'>Username</label>
            <Input id='username-input' value={username} onChange={({ target }) => setUsername(target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='password-input'>Password</label>
            <Input id='password-input' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Field>
          <div>
            <Button color='instagram' type='submit' style={{ float: 'right' }}>Submit</Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default Register;
