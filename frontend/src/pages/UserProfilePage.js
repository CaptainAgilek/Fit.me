import React from 'react';

import { useHistory } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';
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
      user {
        email
      }
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
    variables: { filter }
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
    { id: 1, icon: "hockey", name: 'HTC Praha', date: '20.10.2020', hour: "14:00 - 17:00", address: "Náhodná 88, Praha" },
    { id: 2, icon: "fitness", name: 'Sportcentrum Prosek', date: '24.10.2020', hour: "14:00 - 17:00", address: "Náhodná 89, Praha" },
    { id: 3, icon: "pilates", name: 'Sportcentrum Prosek', date: '29.10.2020', hour: "14:00 - 17:00", address: "Náhodná 89, Praha" },
    { id: 4, icon: "fitness", name: 'Sportcentrum Prosek', date: '2.11.2020', hour: "14:00 - 17:00", address: "Náhodná 89, Praha" },
    { id: 5, icon: "fitness", name: 'Sportcentrum Prosek', date: '12.11.2020', hour: "14:00 - 17:00", address: "Náhodná 89, Praha" },
    { id: 6, icon: "hockey", name: 'HTC Praha', date: '13.11.2020', hour: "14:00 - 17:00", address: "Náhodná 88, Praha" },
  ];

  return (
    <>
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
