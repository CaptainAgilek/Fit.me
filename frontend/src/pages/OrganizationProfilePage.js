import React from 'react';
import { OrganizationProfileTemplate } from 'src/templates/OrganizationProfileTemplate';
import { gql, useMutation, useQuery } from '@apollo/client';

export function OrganizationProfilePage() {
  return (
    <>
      <OrganizationProfileTemplate />
    </>
  );
}
