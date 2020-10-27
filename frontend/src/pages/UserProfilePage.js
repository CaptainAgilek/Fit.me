import React from 'react';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';

export const UserBenefitsEnum = {
    MULTISPORT: "Multisport",
    ACTIVE_PASS: "Active Pass"
}

export function UserProfilePage() {

  const user = {
    firstName: "first name mock",
    lastName: "last name mock",
    username: "username mock",
    email: "email@mock.com",
    mobile: "222222222",
    address: {
      street: "street name mock",
      city: "",
      country: "",
      zip: "",
    },
    benefits: [UserBenefitsEnum.MULTISPORT],
    profileImageUrl: "https://www.ppmagazin.com/wp-content/uploads/2020/05/Aktuality_Kalousek.jpg"
  }

  const userReservations = [{ className: "class name mock", date: "25.10.2020" }, { className: "class name mock1", date: "26.10.2020" }]

  return (
    <UserProfileTemplate user={ user } userReservations={ userReservations }/>
  );
}
