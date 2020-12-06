import React from "react";

export function BasicSlide({ imageUrl, children }) {
  return (
    <div className="each-slide">
      <div style={{ backgroundImage: `url(${imageUrl})` }}>{children}</div>
    </div>
  );
}
