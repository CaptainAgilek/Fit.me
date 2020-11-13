import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Slideshow } from 'src/atoms/';
import { BasicSlideWithBanner } from 'src/molecules/';

const slideImages = [
  'images/slide_1.jpg',
  'images/slide_2.jpg',
  'images/slide_3.jpg',
];

export function LandingSlideshow() {
  return (
    <Slideshow>
      <BasicSlideWithBanner
        imageUrl={slideImages[0]}
        headline="Pro lepší zítřek, začni s jógou hned"
      >
        Široký výběr lekcí ve tvém okolí
        <br />
        Aktuální data o volné kapacitě tvého oblíbeného kurzu
      </BasicSlideWithBanner>
      <BasicSlideWithBanner
        imageUrl={slideImages[1]}
        headline="Pro lepší zítřek, začni s boxem hned!"
      >
        Široký výběr lekcí ve tvém okolí
        <br />
        Aktuální data o volné kapacitě tvého oblíbeného kurzu
      </BasicSlideWithBanner>
      <BasicSlideWithBanner
        imageUrl={slideImages[2]}
        headline="Vyberte si trenéra podle svých představ!"
      >
        Vyberte si osobního trenéra za 5 minut
      </BasicSlideWithBanner>
    </Slideshow>
  );
}
