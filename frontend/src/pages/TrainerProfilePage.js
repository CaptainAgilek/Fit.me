import React, { useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "src/utils/auth";

import { TrainerProfileTemplate } from "src/templates/TrainerProfileTemplate";

const TRAINER_PROFILE_QUERY = gql`
  query trainer($user_id: Int!) {
    trainer(user_id: $user_id) {
      user_id
      firstname
      lastname
      username
      facebook
      instagram
      phone
      description
      ratings {
        sportsman {
          firstname
          lastname
          profile_photo {
            url
          }
        }
        text
        stars
      }
      user {
        email
      }
      places {
        place_id
        city
        street
        zip
        country
      }
      profile_photo {
        url
        photo_id
      }
    }
  }
`;

const UPDATE_TRAINER_PROFILE_MUTATION = gql`
  mutation updateTrainer($input: TrainerInput!) {
    updateTrainer(input: $input)
  }
`;

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword(
    $email: String!
    $oldPassword: String!
    $newPassword: String!
    $newPasswordAgain: String!
  ) {
    changePassword(
      email: $email
      oldPassword: $oldPassword
      newPassword: $newPassword
      newPasswordAgain: $newPasswordAgain
    )
  }
`;

export function TrainerProfilePage() {
  const { user } = useAuth();
  const userId = user.user_id;
  const trainerFetcher = useQuery(TRAINER_PROFILE_QUERY, {
    variables: { user_id: userId },
  });

  const [actionSuccess, setActionSuccess] = useState(false);

  //TODO: add trainer update request just like in org (mutation to go with the form)
  const [updateTrainerRequest, updateTrainerRequestState] = useMutation(
    UPDATE_TRAINER_PROFILE_MUTATION,
    {
      onCompleted: () => {
        trainerFetcher.refetch();
        setActionSuccess({
          message: "Změny profilu uloženy.",
          variant: "success",
        });
      },
    },
    {
      onError: () => {
        setActionSuccess({
          message: "Chyba při ukládání hodnot.",
          variant: "danger",
        });
      },
    }
  );

  const [changePasswordRequest, changePasswordRequestState] = useMutation(
    CHANGE_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        setActionSuccess({
          message: "Heslo bylo změněno.",
          variant: "success",
        });
      },
    },
    {
      onError: () => {
        setActionSuccess({
          message: "Chyba při změně hesla.",
          variant: "danger",
        });
      },
    }
  );

  return (
    <>
      <TrainerProfileTemplate
        trainerData={trainerFetcher.data}
        actionSuccess={actionSuccess}
        setActionSuccess={setActionSuccess}
        error={
          trainerFetcher.error ||
          updateTrainerRequestState.error ||
          changePasswordRequest.error
        }
        updateTrainerRequest={updateTrainerRequest}
        changePasswordRequest={changePasswordRequest}
      />
    </>
  );
}
