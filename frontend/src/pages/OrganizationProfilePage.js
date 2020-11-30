import React, { useEffect } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

import { OrganizationProfileTemplate } from 'src/templates/OrganizationProfileTemplate';

const ACTIONS_QUERY = gql`
  query actionsForPlace($place_id: Int) {
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
        photo_id
        url
      }
    }
  }
`;

const ORGANIZATION_PROFILE_QUERY = gql`
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
      organization_name
      user {
        email
      }
      photo_gallery {
        url
        photo_id
        gallery_name
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
      acceptedBenefits {
        name
      }
      profile_photo {
        url
        photo_id
      }
      banner_photo {
        url
      }
    }
  }
`;

const UPDATE_ORGANIZATION_PROFILE_MUTATION = gql`
  mutation updateOrganization($input: OrganizationInput!) {
    updateOrganization(input: $input)
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

export function OrganizationProfilePage() {
  const { user } = useAuth();

  const profileFetcher = useQuery(ORGANIZATION_PROFILE_QUERY, {
    variables: { user_id: user.user_id },
    onCompleted: () => {
      actionsState.refetch({
        place_id:
          profileFetcher.data &&
          profileFetcher.data.organization.places[0].place_id,
      });
    },
  });

  const actionsState = useQuery(ACTIONS_QUERY, {
    variables: {
      place_id:
        (profileFetcher.data &&
          profileFetcher.data.organization.places[0].place_id) ||
        null,
    },
  });
  const [
    updateOrganizationRequest,
    updateOrganizationRequestState,
  ] = useMutation(UPDATE_ORGANIZATION_PROFILE_MUTATION, {
    onCompleted: () => {
      profileFetcher.refetch();
    },
  });

  const [changePasswordRequest, changePasswordRequestState] = useMutation(
    CHANGE_PASSWORD_MUTATION,
  );

  return (
    <>
      <OrganizationProfileTemplate
        actionsState={actionsState}
        profileFetcher={profileFetcher}
        organizationData={profileFetcher.data}
        loading={profileFetcher.loading}
        error={
          profileFetcher.error ||
          updateOrganizationRequestState.error ||
          changePasswordRequestState.error
        }
        updateOrganizationRequest={updateOrganizationRequest}
        changePasswordRequest={changePasswordRequest}
      />
    </>
  );
}
