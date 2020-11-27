import React from 'react';
import { TestimonialBox } from 'src/atoms/';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

const RATINGS_QUERY = gql`
  query getOrganizationRatings {
    organization(id: $id) {
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
    }
  }
`;

export function TestimonialBoxGrid() {
  const { user } = useAuth();
  /* RATINGS TEST */
  const ratingsFetcher = useQuery(RATINGS_QUERY, { variables: user.user_id});
  const ratingsData = ratingsFetcher.data;
  const ratings =
    ratingsData === undefined ? undefined : ratingsData.organization.ratings;

  console.log(ratingsFetcher);
  console.log("ratings data", ratingsData);
  console.log("haho", ratings);
  console.log("user_id", user.user_id);

  return (
    <div className="d-flex justify-content-center align-items-start flex-wrap">
      <TestimonialBox img="/images/hedgegog.jpg" name={"Enci"} rating={"5/5"}>
        “Já byla spokojna. Fitko s dobrými službami. Určite záleží
        od trenéra. Mým byl Tobias Reuter - skvelý přístup i
        odbornost. Určite odporúčam.”
      </TestimonialBox>
      <TestimonialBox img="/images/cat.jpg" name={"Enci"} rating={"5/5"}>
        “Já byla spokojna. Fitko s dobrými službami. Určite záleží
        od trenéra. Mým byl Tobias Reuter - skvelý přístup i
        odbornost. Určite odporúčam.”
      </TestimonialBox>
    </div>
  );
}
