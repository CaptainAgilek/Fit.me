import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export function Slideshow({ children }) {
  return (
    <div className="slide-container">
      <Slide>
        { children }
      </Slide>
    </div>
  );
}
