import React from 'react';

export function OrganizationMenuButton({ img, children }) {
  return (
    <div className="organization-menu-button" >
      <div className="organization-menu-button-img">
        <img className="img-fluid" src={img} />
      </div>
      <div className="organization-menu-button-text">{children}</div>
    </div>
  );
}
