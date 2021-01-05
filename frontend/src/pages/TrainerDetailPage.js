import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { useAuth } from "src/utils/auth";

import { TrainerDetailTemplate } from "src/templates/TrainerDetailTemplate";

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
        user_id
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

const SERVICE_QUERY = gql`
  query servicesForUser($user_id: Int) {
    servicesForUser(user_id: $user_id) {
      service_id
      user_id
      name
      description
    }
  }
`;

export function TrainerDetailPage(props) {
  var params = new URLSearchParams(props.location.search);
  const trainerId = parseInt(params.get("trainerId"));

  const { user } = useAuth();
  const filter = { id: user.user_id };

  const [actionSuccess, setActionSuccess] = useState(false);

  const servicesState = useQuery(SERVICE_QUERY, {
    variables: {
      user_id: trainerId,
    },
  });

  const userFetcher = useQuery(USER_PROFILE_QUERY, {
    variables: { filter },
  });

  const trainerFetcher = useQuery(TRAINER_PROFILE_QUERY, {
    variables: { user_id: trainerId },
    onCompleted: () => {
      servicesState.refetch({
        user_id:
          trainerFetcher.data && trainerFetcher.data.trainer.user.user_id,
      });
    },
  });

  const state = {
    showLoading:
      (userFetcher.loading && !userFetcher.data) ||
      (trainerFetcher.loading && !trainerFetcher.data),
    showData:
      !userFetcher.loading &&
      !userFetcher.data.error &&
      userFetcher.data &&
      userFetcher.data.sportsman != null &&
      !trainerFetcher.loading &&
      !trainerFetcher.error &&
      trainerFetcher.data &&
      trainerFetcher.data.trainer != null,
  };

  return (
    <>
      <TrainerDetailTemplate
        state={state}
        error={trainerFetcher.error}
        actionSuccess={actionSuccess}
        setActionSuccess={setActionSuccess}
        userFetcher={userFetcher}
        servicesState={servicesState}
      />
    </>
  );
}
