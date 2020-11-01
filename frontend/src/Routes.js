import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignUpPage } from 'src/pages/SignUpPage';
import { SignInPage } from 'src/pages/SignInPage';

import SignUp from "./components/signup.component";
import { UserProfilePage } from 'src/pages/UserProfilePage';

export const route = {
  home: () => `/`,
  verification: () => "/verification/",
<<<<<<< HEAD
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`
=======
  userProfile: () => `/user-profile`
>>>>>>> c1f2e22a16107390d9e7b93c8e38d4875bceedd4
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.signIn()} exact component={SignInPage} />
      <Route path={route.signUp()} exact component={SignUpPage} />

      <Route path="/sign-up" component={SignUp} />
<<<<<<< HEAD
=======

      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.userProfile()} exact component={UserProfilePage} />
>>>>>>> c1f2e22a16107390d9e7b93c8e38d4875bceedd4
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
