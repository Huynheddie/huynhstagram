import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import loginService from '../services/login';
import postService from '../services/posts';

const Login = ({ setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user),
      );
      postService.setToken(user.token);
      setErrorMessage(null);
      history.push('/');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <Card centered>
      <Card.Content>
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>

          <Form.Field>
            <label htmlFor='username-input'>Username</label>
            <Input id='username-input' value={username} onChange={({ target }) => setUsername(target.value)} />
          </Form.Field>

          <Form.Field>
            <label htmlFor='password-input'>Password</label>
            <Input id='password-input' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Field>

          <div>
            <Button
              color='linkedin'
              type='button'
              onClick={() => history.push('../register')}
            >
              Register
            </Button>
            <Button color='instagram' type='submit' style={{ float: 'right' }}>Submit</Button>
          </div>

        </Form>
      </Card.Content>
    </Card>
  );
};

export default Login;
