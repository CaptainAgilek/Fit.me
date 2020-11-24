import React from 'react';
import { OrganizationProfileTemplate } from 'src/templates/OrganizationProfileTemplate';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

export function OrganizationProfilePage() {
  //const user = { user_id: 104 }; //todo
  const { user } = useAuth();
  return (
    <>
      <OrganizationProfileTemplate user={user} />
    </>
  );
}
