import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from "./auth";
import { route } from 'src/Routes';

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  const homeLink = route.home();

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={homeLink} />
        )
      }
    />
  );
}
