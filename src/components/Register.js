import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import userService from '../services/user';
import loginService from '../services/login';
import postService from '../services/posts';
import Notification from './Notification';

const Register = () => {
  const history = useHistory();
  const [name, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const maxLength = 14;

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters long.');
        return;
      }
      setIsLoading(true);
      await userService.register({
        username, name, password,
      });

      // Automatically login new user
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
      setErrorMessage('Username is already taken');
      setIsLoading(false);
    }
  };

  const handleChangeUsername = async (event) => {
    event.preventDefault();
    setUsername(event.target.value.slice(0, maxLength));
  };

  return (
    <div style={{ height: '100%', paddingTop: '6.5%' }}>
      <Notification message={errorMessage} />
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
              <Input id='username-input' value={username} onChange={handleChangeUsername} />
            </Form.Field>
            <Form.Field>
              <label htmlFor='password-input'>Password</label>
              <Input id='password-input' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
            </Form.Field>
            <div>
              <Button
                type='submit'
                loading={isLoading}
                disabled={isLoading}
                fluid
                style={{ backgroundColor: '#0095f6', color: 'white' }}
              >Submit
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>

      <Card centered>
        <Card.Content style={{ display: 'flex', justifyContent: 'center' }}>
          <p style={{ margin: 0 }}>Already have an account?</p>
          <a href='/login' style={{ margin: '0px 0px 0px 5px', fontWeight: '600', color: '#0095f6' }}>Sign In</a>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Register;
