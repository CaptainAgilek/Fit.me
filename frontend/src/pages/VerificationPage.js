import React from 'react';
import { gql, useMutation  } from '@apollo/client';

const VERIFY_REGISTRATION_MUTATION = gql`
  mutation VerifyRegistration($token: String!) {
    verifyRegistration(token: $token)
  }
`;
export function VerificationPage(props) {
  var params = new URLSearchParams(props.location.search);
  const token = params.get('token');

  const tokenState = useMutation(VERIFY_REGISTRATION_MUTATION, {
    variables: { token },
  });

  let verifiedText = 'Probíhá ověřování';

  if (token) {
    if (tokenState.data) {
      if (tokenState.data && tokenState.data.verifyRegistration) {
        verifiedText =
          'Gratulujeme, Vaše emailová adresa byla ověřena, můžete se přihlásit.';
      } else {
        verifiedText = 'Váš email se nepodařilo ověřit.';
      }
    }
  }

  return (
    <div className="appWrapper">
      <h1>Verification Page</h1>
      <p>{verifiedText}</p>
    </div>
  );
}
