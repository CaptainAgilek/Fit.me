import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Slideshow } from 'src/atoms/';
import { BasicSlideWithBanner } from 'src/molecules/';

const slides = [
  {
    imageUrl: 'images/slide_1.jpg',
    headline: 'Pro lepší zítřek, začni s jógou hned',
    children: (
      <>
        Široký výběr lekcí ve tvém okolí
        <br />
        Aktuální data o volné kapacitě tvého oblíbeného kurzu
      </>
    )
  },
  {
    imageUrl: 'images/slide_2.jpg',
    headline: 'Pro lepší zítřek, začni s boxem hned!',
    children: (
      <>
        Široký výběr lekcí ve tvém okolí
        <br />
        Aktuální data o volné kapacitě tvého oblíbeného kurzu
      </>
    )
  },
  {
    imageUrl: 'images/slide_3.jpg',
    headline: 'Vyberte si trenéra podle svých představ!',
    children: (
      <>
        Vyberte si osobního trenéra za 5 minut
      </>
    )
  }
]

export function LandingSlideshow() {
  return (
    <Slideshow>
      {slides.map((slide) => {
        return (
          <BasicSlideWithBanner
            imageUrl={slide.imageUrl}
            headline={slide.headline}
            key={slide.imageUrl}
          >
            {slide.children}
          </BasicSlideWithBanner>
        );
      })}
    </Slideshow>
  );
}
