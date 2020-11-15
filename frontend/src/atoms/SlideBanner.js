import React from 'react';

export function SlideBanner({headline, children}) {
  return (
      <div className="slide-banner">
        <h1> {headline}</h1>
        {children}
      </div>
    );
}
