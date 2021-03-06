import React from "react";
import { OrganizationMenuButton } from "src/atoms/";

export function OrganizationMenu() {
  return (
    <div className="organization-menu d-flex justify-content-center align-items-start flex-wrap">
      <OrganizationMenuButton
        img="/images/icons/calendar.png"
        section={"#kalendar"}
      >
        KALENDÁŘ AKCÍ
      </OrganizationMenuButton>
      <OrganizationMenuButton
        img="/images/icons/barbell.svg"
        section={"#sluzby"}
      >
        SLUŽBY
      </OrganizationMenuButton>
      <OrganizationMenuButton
        img="/images/icons/personal.svg"
        section={"#treneri"}
      >
        TRENÉŘI
      </OrganizationMenuButton>
      <OrganizationMenuButton
        img="/images/icons/image-gallery.png"
        section={"#galerie"}
      >
        GALERIE
      </OrganizationMenuButton>
      <OrganizationMenuButton
        img="/images/icons/star.png"
        section={"#hodnoceni"}
      >
        HODNOCENÍ
      </OrganizationMenuButton>
    </div>
  );
}
