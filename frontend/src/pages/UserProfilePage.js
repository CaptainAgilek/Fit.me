import React,  { useState } from 'react';

import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';
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

const DELETE_USER_PROFILE_MUTATION = gql`
  mutation deleteUser($userId: Int!)  {
    deleteUser(user_id: $userId)
  }
`;

export function UserProfilePage() {
  const { user } = useAuth();
  const { username } = useParams();

  const filter = {username: username};

  const userFetcher = useQuery(USER_PROFILE_QUERY, {
      variables: { filter },
  });

  const [deleteUserRequest, deleteUserRequstState] = useMutation(
    DELETE_USER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        userFetcher.refetch();
      },
    },
  );

  const state = {
    showLoading: deleteUserRequstState.loading || (userFetcher.loading && !userFetcher.data),
    showUknownUser: !deleteUserRequstState.error && !deleteUserRequstState.loading && userFetcher.data && userFetcher.data.sportsman == null,
    showData: !deleteUserRequstState.error && !deleteUserRequstState.loading && userFetcher.data && userFetcher.data.sportsman != null,
  }

  const userReservations = [{ id: 1, className: "class name mock", date: "25.10.2020" }, { id: 2, className: "class name mock1", date: "26.10.2020" }]

  return (
    <UserProfileTemplate
      state = { state }
      userFetcherError = {userFetcher.error}
      deleteUserError = {deleteUserRequstState.error}
      data = {userFetcher.data}
      onReload = {userFetcher.refetch()}
      userReservations= { userReservations }
      deleteUserRequest= { deleteUserRequest }
    />
  );
}
