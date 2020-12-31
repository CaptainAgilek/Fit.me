import React, { useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { OrganizationDetailTemplate } from "src/templates/OrganizationDetailTemplate";
import { useAuth } from "src/utils/auth";

import { OpenStreetMapProvider } from "leaflet-geosearch";

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

export function OrganizationDetailPage(props) {
  var params = new URLSearchParams(props.location.search);
  const organizationId = parseInt(params.get("organizationId"));

  const { user } = useAuth();

  const [actionSuccess, setActionSuccess] = useState(false);

  const filter = { id: user.user_id };

  const userFetcher = useQuery(USER_PROFILE_QUERY, {
    variables: { filter },
  });

  const organizationFetcher = useQuery(ORGANIZATION_PROFILE_QUERY, {
    variables: { user_id: organizationId },
    onCompleted: () => {
      actionsState.refetch({
        place_id:
          organizationFetcher.data &&
          organizationFetcher.data.organization &&
          organizationFetcher.data.organization.places[0].place_id,
      });
    },
  });

  const servicesState = useQuery(SERVICE_QUERY, {
    variables: {
      user_id: organizationId,
    },
  });

  const actionsState = useQuery(ACTIONS_QUERY, {
    variables: {
      place_id:
        (organizationFetcher.data &&
          organizationFetcher.data.organization &&
          organizationFetcher.data.organization.places[0].place_id) ||
        null,
    },
  });

  const state = {
    showLoading:
      (userFetcher.loading && !userFetcher.data) ||
      (organizationFetcher.loading && !organizationFetcher.data),
    showData:
      !userFetcher.loading &&
      !userFetcher.data.error &&
      userFetcher.data &&
      userFetcher.data.sportsman != null &&
      !organizationFetcher.loading &&
      !organizationFetcher.error &&
      organizationFetcher.data &&
      organizationFetcher.data.organization != null,
  };

  const error =
    userFetcher.error ||
    organizationFetcher.error ||
    userFetcher.data == null ||
    organizationFetcher.data == null ||
    (userFetcher.data && !userFetcher.data.sportsman) ||
    (organizationFetcher.data && !organizationFetcher.data.organization);

  const mapProvider = new OpenStreetMapProvider();

  return (
    <>
      <OrganizationDetailTemplate
        state={state}
        error={error}
        actionSuccess={actionSuccess}
        setActionSuccess={setActionSuccess}
        organizationFetcher={organizationFetcher}
        userFetcher={userFetcher}
        servicesState={servicesState}
        mapProvider={mapProvider}
        actionsState={actionsState}
      />
    </>
  );
}
