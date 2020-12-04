import React, { useState } from "react";
import { BasicSlide, SlideBanner } from "src/atoms/";

export function BasicSlideWithBanner({ imageUrl, headline, children }) {
  return (
    <BasicSlide imageUrl={imageUrl}>
      <SlideBanner headline={headline}>{children}</SlideBanner>
    </BasicSlide>
  );
}
