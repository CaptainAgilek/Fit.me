import React from "react";
import { TestimonialBox } from "src/atoms/";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "src/utils/auth";

const RATINGS_QUERY = gql`
  query getOrganizationRatings($id: Int!) {
    organization(user_id: $id) {
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

export function TestimonialBoxGrid({ ratingsData }) {
  /*const { user } = useAuth();
  const ratingsFetcher = useQuery(RATINGS_QUERY, {
    variables: { id: user.user_id },
  });
  const ratingsData = ratingsFetcher.data;*/
  /*const ratings =
    ratingsData === undefined ? undefined : ratingsData.organization.ratings;*/

  //console.log(ratingsFetcher);
  console.log('ratings data', ratingsData);
  //console.log('haho', ratings);
  //console.log('user_id', user.user_id);


  return (
    <div className="d-flex justify-content-center align-items-start flex-wrap">
      {ratingsData &&
        ratingsData.map((x) => (
          <TestimonialBox
            img={x.sportsman.profile_photo && x.sportsman.profile_photo.url}
            name={x.sportsman.firstname + " " + x.sportsman.lastname}
            rating={x.stars + "/5"}
          >
            {x.text}
          </TestimonialBox>
        ))}
    </div>
  );
}
