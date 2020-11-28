import React from 'react';

export function TestimonialBox({ img, name, children, rating }) {
  return (
      <div className="organization-profile-rating-container">
        <div>
          <img className="testimonialProfilePicture" src={img}/>
          <h6 className="ratings">{rating}</h6>
          <h5>{name}</h5>
          <div className="font-italic">{children}</div>
        </div>
      </div>
  );
}
