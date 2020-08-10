import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import loginService from '../services/login';
import postService from '../services/posts';
import Notification from './Notification';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', padding: '7%' }}>
      <Notification message={errorMessage} />
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
              <Button loading={loading} type='submit' fluid style={{ backgroundColor: '#0095f6', color: 'white' }}>Submit</Button>
            </div>

          </Form>
        </Card.Content>
      </Card>

      <Card centered>
        <Card.Content style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ margin: 0 }}>Don't have an account?</p>
          <a href='/register' style={{ margin: '0px 0px 0px 5px', fontWeight: '600', color: '#0095f6' }}>Sign Up</a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Login;
