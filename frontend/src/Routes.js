import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignUpPage } from 'src/pages/SignUpPage';
import { SignInPage } from 'src/pages/SignInPage';

import SignUp from "./components/signup.component";

export const route = {
  home: () => `/`,
  verification: () => "/verification/",
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.signIn()} exact component={SignInPage} />
      <Route path={route.signUp()} exact component={SignUpPage} />

      <Route path="/sign-up" component={SignUp} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
