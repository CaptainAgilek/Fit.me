import React, { useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';
import { UserBenefitsEnum } from 'src/utils/const';
import { useAuth } from 'src/utils/auth';
import { TopNavigation } from 'src/organisms/';

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
        place_id
        city
        street
        country
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

const DELETE_USER_PROFILE_MUTATION = gql`
  mutation deleteUser($userId: Int!) {
    deleteUser(user_id: $userId)
  }
`;

const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation updateUser($input: SportsmanInput!) {
    updateSportsman(input: $input)
  }
`;

export function UserProfilePage() {
  const { user } = useAuth();
  const history = useHistory();
  const { username } = useParams();


  const filter = { username: username };

  const userFetcher = useQuery(USER_PROFILE_QUERY, {
    variables: { filter },
  });

  const [deleteUserRequest, deleteUserRequestState] = useMutation(
    DELETE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        history.replace('/');
      },
    },
  );

  const [updateUserRequest, updateUserRequestState] = useMutation(
    UPDATE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        userFetcher.refetch();
      },
    },
  );

  const state = {
    showLoading:
      deleteUserRequestState.loading ||
      (userFetcher.loading && !userFetcher.data),
    showUknownUser:
      !deleteUserRequestState.error &&
      !deleteUserRequestState.loading &&
      userFetcher.data &&
      userFetcher.data.sportsman == null,
    showData:
      !deleteUserRequestState.error &&
      !deleteUserRequestState.loading &&
      userFetcher.data &&
      userFetcher.data.sportsman != null,
  };

  const userReservations = [
    { id: 1, className: 'kung fu s Martinem', date: '20.10.2020' },
    { id: 2, className: 'hokej s Lenkou', date: '24.10.2020' },
    { id: 3, className: 'činky s Honzou', date: '26.10.2020' },
    { id: 4, className: 'fotbal s Petrem', date: '27.10.2020' },
    { id: 5, className: 'kong fu s druhym Martinem', date: '1.11.2020' },
  ];

  return (
    <>
    <TopNavigation/>
    <UserProfileTemplate
      state={state}
      error={userFetcher.error || deleteUserRequestState.error}
      data={userFetcher.data}
      onReload={() => { userFetcher.refetch(); }}
      userReservations={userReservations}
      deleteUserRequest={deleteUserRequest}
      updateUserRequest={updateUserRequest}
    />
    </>
  );
}
