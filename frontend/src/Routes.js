import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import SignUp from "./components/signup.component";

export const route = {
  home: () => `/`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path="/registration" component={RegistrationPage} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
