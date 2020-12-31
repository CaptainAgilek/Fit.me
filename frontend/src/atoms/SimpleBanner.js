import React from "react";

export function SimpleBanner({ headline, children }) {
  return (
    <div className="simple-banner">
      <h1> {headline}</h1>
      {children}
    </div>
  );
}
