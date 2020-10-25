import React from 'react';

import { UserProfileForm } from 'src/organisms/';
import { ReservationList } from 'src/atoms/';
import { EditableAvatarPicture } from 'src/molecules/';

export function UserProfileTemplate( { user, userReservations } ) {
  return (
    <>
      <EditableAvatarPicture
                  src={user.profileImageUrl}
                  alt={user.name}
                  size="4"
                  className="mb2"
                  onChange=""
      />

      <UserProfileForm user={user}/>

      <ReservationList reservations={ userReservations } />
    </>
  );
}
