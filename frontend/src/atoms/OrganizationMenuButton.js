import React from 'react';

export function OrganizationMenuButton({ img, children, section }) {
  return (
    <a className="href" href={section}>
      <div className="organization-menu-button">
          <img className="organization-menu-button-img img-fluid" src={img} />
        <div className="organization-menu-button-text">{children}</div>
      </div>
    </a>
  );
}
