import React from "react";

import { Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export function OrganizationDetailMap({ locationState }) {
  const DBG_DISABLE_MAP = true;
  return (
    <Col xl={4} className="organization-detail-info">
      {locationState && console.log(locationState)}
      {!DBG_DISABLE_MAP && locationState && (
        <MapContainer
          center={[locationState.y, locationState.x]}
          zoom={13}
          scrollWheelZoom={false}
          className="map-container organization-detail-carousel-container"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[locationState.y, locationState.x]}></Marker>
        </MapContainer>
      )}
    </Col>
  );
}
