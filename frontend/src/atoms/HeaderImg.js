import React from "react";

export function HeaderImg({ img, className, children }) {
  return (
    <div className={"headerImg " + className} style={{ backgroundImage: `url(${img})` }}>
      {children}
    </div>
  );
}
