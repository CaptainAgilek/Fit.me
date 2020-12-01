import React, { useEffect } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

import { TrainerProfileTemplate } from 'src/templates/TrainerProfileTemplate';

export function TrainerProfilePage() {
  return (
    <>
      <TrainerProfileTemplate/>
    </>
  );
}
