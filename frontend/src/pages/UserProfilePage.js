import React,  { useState } from 'react';

import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';
import { PageNotFound } from './PageNotFound';
import { UserBenefitsEnum } from 'src/utils/const';
import { useAuth } from 'src/utils/auth';

const USER_PROFILE_QUERY = gql`
  query getSportsman($filter: SportsmanFilter!) {
    sportsman(filter: $filter) {
    	user_id
      firstname
      lastname
      username
    	email
      phone
      places {
        city
        street
        zip
      }
      benefits {
        name
      }
      profile_photo {
        url
      }
    }
  }
`;

export function UserProfilePage() {
  const { user } = useAuth();
  const { username } = useParams();

  const filter = {username: username};

  const userFetcher = useQuery(USER_PROFILE_QUERY, {
      variables: { filter },
  });

  const userReservations = [{ className: "class name mock", date: "25.10.2020" }, { className: "class name mock1", date: "26.10.2020" }]

  return (
    <UserProfileTemplate
      loading = {userFetcher.loading}
      error = {userFetcher.error}
      data = {userFetcher.data}
      onReload = {userFetcher.refetch()}
      user={ user }
      userReservations={ userReservations }
    />
  );
}
