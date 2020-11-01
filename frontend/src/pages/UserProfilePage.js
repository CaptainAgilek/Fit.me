import React,  { useState } from 'react';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';

export const UserBenefitsEnum = {
    MULTISPORT: "Multisport",
    ACTIVE_PASS: "Active Pass"
}

export function UserProfilePage() {
  const [profileImageUrl, setProfileImageUrl] = useState("https://www.ppmagazin.com/wp-content/uploads/2020/05/Aktuality_Kalousek.jpg");

  const user = {
    user_id: 1,
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
  }
  user.profileImageUrl = profileImageUrl;

  const userReservations = [{ className: "class name mock", date: "25.10.2020" }, { className: "class name mock1", date: "26.10.2020" }]

  return (
    <UserProfileTemplate user={ user } userReservations={ userReservations } setProfileImageUrl={setProfileImageUrl}/>
  );
}
