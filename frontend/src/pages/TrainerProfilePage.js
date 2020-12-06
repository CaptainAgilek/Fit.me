import React, { useEffect, useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

import { TrainerProfileTemplate } from 'src/templates/TrainerProfileTemplate';

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
      user{
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

export function TrainerProfilePage() {
  const { user } = useAuth();
  const userId = user.user_id;
  const trainerFetcher = useQuery(TRAINER_PROFILE_QUERY, {
    variables: { user_id: userId },
  });

  const [actionSuccess, setActionSuccess] = useState(false);

  return (
    <>
      <TrainerProfileTemplate trainerData={trainerFetcher.data} actionSuccess={actionSuccess} setActionSuccess={setActionSuccess} />
    </>
  );
}
