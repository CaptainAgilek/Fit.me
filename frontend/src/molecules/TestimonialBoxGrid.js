import React from "react";
import { TestimonialBox } from "src/atoms/";

export function TestimonialBoxGrid({ ratingsData }) {

  return (
    <div className="d-flex justify-content-center align-items-start flex-wrap">
      {ratingsData &&
        ratingsData.map((x) => (
          <TestimonialBox
            img={x.sportsman.profile_photo && x.sportsman.profile_photo.url}
            name={x.sportsman.firstname + " " + x.sportsman.lastname}
            rating={x.stars + "/5"}
            key={x.id}
          >
            {x.text}
          </TestimonialBox>
        ))}
    </div>
  );
}
