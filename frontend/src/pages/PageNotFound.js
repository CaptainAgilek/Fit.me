import React from 'react';
import { TopNavigation } from 'src/organisms/';
export function PageNotFound() {
  return (
    <>
    <TopNavigation/>
    <div className="appWrapper">
      <h1>Error 404:</h1>
      <p>Page not found</p>
    </div>
    </>
  );
}
