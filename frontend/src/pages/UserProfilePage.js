import React from 'react';

import { UserProfileTemplate } from 'src/templates/UserProfileTemplate';

export function UserProfilePage() {

  const user = {
    firstName: "first name mock",
    lastName: "last name mock",
    email: "email@mock.com",
    profileImageUrl: "https://www.ppmagazin.com/wp-content/uploads/2020/05/Aktuality_Kalousek.jpg"
  }

  const userReservations = [{ className: "class name mock", date: "25.10.2020" }]

  return (
    <UserProfileTemplate user={ user } userReservations={ userReservations }/>
  );
}
