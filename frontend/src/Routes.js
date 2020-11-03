import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { UserProfilePage } from 'src/pages/UserProfilePage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { SignInPage } from 'src/pages/SignInPage';

export const route = {
  home: () => `/`,
  verification: () => "/verification/",


  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,

  userProfile: (username) => `/profile/${username}`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signUp()} exact component={SignUpPage} />
      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.userProfile(':username')} exact component={UserProfilePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
