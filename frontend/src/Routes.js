import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { UserProfilePage } from 'src/pages/UserProfilePage';

export const route = {
  home: () => `/`,
  verification: () => "/verification/",
  userProfile: (username) => `/profile/${username}`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.userProfile(':username')} exact component={UserProfilePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
