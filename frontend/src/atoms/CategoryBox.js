import React from "react";

export function CategoryBox({ color, img, children }) {
  return (
    <div className="category-box" style={{ backgroundColor: color }}>
      <div className="category-box-img">
        <img className="img-fluid" src={img} alt="category icon" />
      </div>
      <div className="category-box-text">{children}</div>
    </div>
  );
}
