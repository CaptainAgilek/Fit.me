import React from "react";

import { SignedInUserLandingTemplate } from "src/templates/SignedInUserLandingTemplate";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export function SignedInUserLandingPage() {
  const mapProvider = new OpenStreetMapProvider({
    params: {
      addressdetails: 1,
    },
  });

  return (
    <>
      <SignedInUserLandingTemplate mapProvider={mapProvider} />
    </>
  );
}
