import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, data, ...rest }) => {
  const loggedInUser = window.localStorage.getItem('loggedInUser');

  return (
    <Route
      {...rest}
      render={(props) => (loggedInUser
        ? <Component {...props} {...data} />
        : <Redirect to='/login' />
      )}
    />

  );
};

export default PrivateRoute;
