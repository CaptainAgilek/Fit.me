import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from 'src/utils/PrivateRoute';

import { LandingPage } from 'src/pages/LandingPage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { UserProfilePage } from 'src/pages/UserProfilePage';
import { OrganizationProfilePage } from 'src/pages/OrganizationProfilePage';
import { TrainerProfilePage } from 'src/pages/TrainerProfilePage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { SignInPage } from 'src/pages/SignInPage';

export const route = {
  home: () => `/`,
  about: () => `/about`,
  verification: () => "/verification/",

  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,

  userProfile: () => `/user/profile`,
  organizationProfile: () => `/organization/profile`,
  trainerProfiler: () => `/trainer/profile`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={LandingPage} />
      <Route path={route.signUp()} exact component={SignUpPage} />
      <Route path={route.signIn()} exact component={SignInPage} />
      <Route path={route.verification()} exact component={VerificationPage} />
      <Route path={route.trainerProfiler()} exact component={TrainerProfilePage} />
      <PrivateRoute path={route.userProfile()} exact component={UserProfilePage} />
      <PrivateRoute path={route.organizationProfile()} exact component={OrganizationProfilePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
