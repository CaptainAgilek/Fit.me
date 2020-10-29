import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import SignUp from "./components/signup.component";
import { UserProfilePage } from 'src/pages/UserProfilePage';

export const route = {
  home: () => `/`,
  verification: () => "/verification/",
  userProfile: () => `/user-profile`
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />

      <Route path="/registration" component={RegistrationPage} />
      <Route path="/sign-up" component={SignUp} />

      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.userProfile()} exact component={UserProfilePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
