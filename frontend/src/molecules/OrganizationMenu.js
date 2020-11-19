import React from 'react';
import { OrganizationMenuButton } from 'src/atoms/';

export function OrganizationMenu() {
  return (
    <div className="organization-menu d-flex justify-content-center align-items-start flex-wrap">
      <OrganizationMenuButton img="/images/icons/calendar.png">KALENDÁŘ AKCÍ</OrganizationMenuButton>
      <OrganizationMenuButton img="/images/icons/barbell.svg">SLUŽBY</OrganizationMenuButton>
      <OrganizationMenuButton img="/images/icons/personal.svg">TRENÉŘI</OrganizationMenuButton>
      <OrganizationMenuButton img="/images/icons/image-gallery.png">GALERIE</OrganizationMenuButton>
      <OrganizationMenuButton img="/images/icons/star.png">HODNOCENÍ</OrganizationMenuButton>
    </div>
  );
}
