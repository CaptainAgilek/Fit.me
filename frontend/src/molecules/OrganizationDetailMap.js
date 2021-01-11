import React from "react";

import { Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export function OrganizationDetailMap({ locationState }) {
  const DBG_DISABLE_MAP = false;
  return (
    <Col
      xl={4}
      lg={4}
      md={4}
      sm={6}
      xs={12}
      className="organization-detail-info"
    >
      {!DBG_DISABLE_MAP && locationState && locationState.length > 0 && (
        <MapContainer
          center={[locationState[0].y, locationState[0].x]}
          zoom={13}
          scrollWheelZoom={false}
          className="map-container organization-detail-carousel-container"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationState.map((loc) => (
            <Marker key={loc.raw.place_id} position={[loc.y, loc.x]}>
              <Popup>
                {loc.orgName}
                <br />
                {loc.label}{" "}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Col>
  );
}
