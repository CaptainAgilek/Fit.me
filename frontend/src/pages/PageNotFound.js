import React from "react";
import { Navigation } from "src/organisms/";

export function PageNotFound() {
  return (
    <>
      <Navigation />
      <div className="appWrapper">
        <h1>Error 404:</h1>
        <p>Page not found</p>
      </div>
    </>
  );
}
