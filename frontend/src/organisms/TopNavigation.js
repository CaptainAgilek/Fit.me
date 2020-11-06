import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


import { Link, NavLink, Button } from 'src/atoms/';

import { route } from 'src/Routes';
import { SignUpTemplate } from '../templates/SignUpTemplate';

export function TopNavigation() {
  return (
    <>
    <nav className="flex justify-between bb b--white-10 bg-black white">
      <Link
        to={route.home()}
        noUnderline
        className="b white flex items-center pv2 ph3"
      >
        <FontAwesomeIcon icon={faDumbbell} className="mr2 f4" />
        Fit.me
      </Link>
      <div className="flex-grow flex items-center">
        <NavLink exact to={route.home()} className="pa3">
          Home
        </NavLink>
        <NavLink to={route.signIn()} className="pa3">
          Sign In
        </NavLink>
        <NavLink
          to={route.signUp()}
          as={Link}
          color="navbar"
          narrow
          border
          noUnderline
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
    </>
  );
}
