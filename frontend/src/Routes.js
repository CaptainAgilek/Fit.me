import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';

export const route = {
  home: () => `/`,
  verification: () => "/verification/"
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
