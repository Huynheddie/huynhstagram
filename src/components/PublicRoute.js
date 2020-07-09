import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, data, ...rest }) => {
  const loggedInUser = window.localStorage.getItem('loggedInUser');

  return (
    <Route
      {...rest}
      render={(props) => (loggedInUser
        ? <Redirect to='/' />
        : <Component {...props} {...data} />
      )}
    />
  );
};

export default PublicRoute;
