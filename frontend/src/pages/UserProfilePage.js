import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
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
        photo_id
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

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($email: String!, $oldPassword: String!, $newPassword: String!, $newPasswordAgain: String!) {
    changePassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword, newPasswordAgain: $newPasswordAgain)
  }
`;

export function UserProfilePage() {
  const { user } = useAuth();
  const history = useHistory();

  const filter = { id: user.user_id };

  const userFetcher = useQuery(USER_PROFILE_QUERY, {
    variables: { filter },  onCompleted: (data) => {
        console.log("refetched user " + JSON.stringify(data));
      },
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

  const [changePasswordRequest, changePasswordRequestState] = useMutation(CHANGE_PASSWORD_MUTATION);

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
      onReload={userFetcher.refetch}
      userReservations={userReservations}
      deleteUserRequest={deleteUserRequest}
      updateUserRequest={updateUserRequest}
      changePasswordRequest={changePasswordRequest}
    />
    </>
  );
}
