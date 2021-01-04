import React from "react";

export function CategoryBox({
  id,
  color,
  img,
  children,
  border,
  handleCategoryClick,
  selectedCategory,
}) {
  return (
    <div
      className="category-box"
      style={{ backgroundColor: color, border: border ? "7px solid" : "none" }}
      onClick={handleCategoryClick && (() => handleCategoryClick(selectedCategory === id ? null : id))}
    >
      <div className="category-box-img">
        <img className="img-fluid" src={img} alt="category icon" />
      </div>
      <div className="category-box-text">{children}</div>
    </div>
  );
}
