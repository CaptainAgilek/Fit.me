import React from 'react';
import { OrganizationProfileTemplate } from 'src/templates/OrganizationProfileTemplate';
import { gql, useMutation, useQuery } from '@apollo/client';

export function OrganizationProfilePage() {
  const user = { user_id: 104 }; //todo

  return (
    <>
      <OrganizationProfileTemplate user={user} />
    </>
  );
}
