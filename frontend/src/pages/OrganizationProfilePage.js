import React from 'react';
import { OrganizationProfileTemplate } from 'src/templates/OrganizationProfileTemplate';

import { gql, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

const ACTIONS_QUERY = gql`
  query actionsForPlace($place_id: Int!) {
    actionsForPlace(place_id: $place_id) {
      action_id
      place_id
      date
      time
      price
      trainer_id
      max_capacity
      name
      photo_id
      photo {
        url
      }
    }
  }
`;

const ORGANIZATION_QUERY = gql`
  query organization($user_id: Int!) {
    organization(user_id: $user_id) {
      user_id
      trainers {
        user_id
        firstname
        lastname
        facebook
        instagram
        description
        profile_photo {
          url
        }
      }
      ratings {
        id
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
      name
      user {
        email
      }
      photo_gallery {
        url
        photo_id
        gallery_name
        is_profile_picture
      }
    }
  }
`;

export function OrganizationProfilePage() {
  const place_id = 1;
  const user_id = 1;
  const actionsState = useQuery(ACTIONS_QUERY, {
    variables: { place_id: place_id },
  });
  const organizationState = useQuery(ORGANIZATION_QUERY, {
    variables: { user_id: user_id },
  });

  const { user } = useAuth();

  return (
    <>
      <OrganizationProfileTemplate
        actionsState={actionsState}
        organizationState={organizationState}
        user={user}
      />
    </>
  );
}
