import React, { useState, useEffect } from 'react';

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

const SERVICE_QUERY = gql`
  query servicesForPlace($place_id: Int) {
    servicesForPlace(place_id: $place_id) {
      service_id
      place_id
      name
      description
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
      photo_gallery {
        url
        photo_id
        gallery_name
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

  const [actionSuccess, setActionSuccess] = useState(false);

  const profileFetcher = useQuery(ORGANIZATION_PROFILE_QUERY, {
    variables: { user_id: user.user_id },
    onCompleted: () => {
      actionsState.refetch({
        place_id:
          profileFetcher.data &&
          profileFetcher.data.organization.places[0].place_id,
      });
      servicesState.refetch({
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

  const servicesState = useQuery(SERVICE_QUERY, {
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
  ] = useMutation(
    UPDATE_ORGANIZATION_PROFILE_MUTATION,
    {
      onCompleted: () => {
        profileFetcher.refetch();
        setActionSuccess({
          message: 'Změny profilu uloženy.',
          variant: 'success',
        });
      },
    },
    {
      onError: () => {
        setActionSuccess({
          message: 'Chyba při ukládání hodnot.',
          variant: 'danger',
        });
      },
    },
  );

  const [changePasswordRequest, changePasswordRequestState] = useMutation(
    CHANGE_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        setActionSuccess({
          message: 'Heslo bylo změněno.',
          variant: 'success',
        });
      },
    },
    {
      onError: () => {
        setActionSuccess({
          message: 'Chyba při změně hesla.',
          variant: 'danger',
        });
      },
    },
  );

  return (
    <>
      <OrganizationProfileTemplate
        actionsState={actionsState}
        servicesState={servicesState}
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
        actionSuccess={actionSuccess}
        setActionSuccess={setActionSuccess}
      />
    </>
  );
}
