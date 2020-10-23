import React from 'react';
import { gql, useQuery } from '@apollo/client';

const VERIFY_REGISTRATION_QUERY = gql`
  query VerifyRegistration($token: String!) {
    verifyRegistration(token: $token) {
      is_verified
    }
  }
`;
export function VerificationPage(props) {
  var params = new URLSearchParams(props.location.search);
  const token = params.get("token");

  const tokenState = useQuery(VERIFY_REGISTRATION_QUERY, {
    variables: { token },
  });


  let verifiedText = "Probíhá ověřování";

  if (token) {
        if (tokenState.data) {
          if (tokenState.data && tokenState.data.verifyRegistration.is_verified) {
            verifiedText = "Gratulujeme, Vaše emailová adresa byla ověřena, můžete se přihlásit.";
          } else {
            verifiedText = "Váš email se nepodařilo ověřit.";
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
