import React, { useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "src/utils/auth";

import { PublicOrganizationProfileTemplate } from "src/templates/PublicOrganizationProfileTemplate";

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
  query servicesForUser($user_id: Int) {
    servicesForUser(user_id: $user_id) {
      service_id
      user_id
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

export function PublicOrganizationProfilePage() {
  const { user } = useAuth();

  const profileFetcher = useQuery(ORGANIZATION_PROFILE_QUERY, {
    variables: { user_id: user.user_id },
    onCompleted: () => {
      servicesState.refetch({
        user_id:
          profileFetcher.data && profileFetcher.data.organization.user.user_id,
      });
    },
  });

  const servicesState = useQuery(SERVICE_QUERY, {
    variables: {
      user_id:
        (profileFetcher.data &&
          profileFetcher.data.organization.user.user_id) ||
        null,
    },
  });
  return (
    <>
      <PublicOrganizationProfileTemplate
        servicesState={servicesState}
        profileFetcher={profileFetcher}
        organizationData={profileFetcher.data}
      />
    </>
  );
}
