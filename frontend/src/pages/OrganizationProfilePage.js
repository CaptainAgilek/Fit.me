import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

import { OrganizationProfileTemplate } from 'src/templates/OrganizationProfileTemplate';

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
query getOrganization($user_id: Int!) {
  organization(user_id: $user_id) {
    user_id
    organization_name
    username
    phone
    trainers {
      user_id
      firstname
      lastname
    }
    user {
      email
    }
    places {
      city
      street
      zip
      country
    }
    acceptedBenefits {
      name
    }
    profile_photo {
      url
    }
    banner_photo {
      url
    }
  }
}
`;

export function OrganizationProfilePage() {
  const { user } = useAuth();

  const place_id = 1;
  const user_id = 1;
  const actionsState = useQuery(ACTIONS_QUERY, {
    variables: { place_id: place_id },
  });
  const organizationState = useQuery(ORGANIZATION_QUERY, {
    variables: { user_id: user.user_id },
  });

  return (
    <>
      <OrganizationProfileTemplate
        actionsState={actionsState}
        organizationData={organizationState.data}
        loading={organizationState.loading}
        error={organizationState.error}
        onReload={organizationState.refetch}
      />
    </>
  );
}
