import React, {useEffect} from 'react';
import { gql, useMutation  } from '@apollo/client';

const VERIFY_REGISTRATION_MUTATION = gql`
  mutation VerifyRegistration($token: String!) {
    verifyRegistration(token: $token)
  }
`;
export function VerificationPage(props) {
  var params = new URLSearchParams(props.location.search);
  const token = params.get('token');

  const [tokenStateRequest, tokenState] = useMutation(VERIFY_REGISTRATION_MUTATION);
  useEffect(() => { tokenStateRequest({ variables: { token } });}, [token]);

  let message = 'Nevalidní token ' + token;

  if (token) {
    if (!tokenState.data && tokenState.loading) {
      message = 'Loading...';
    }

    if (tokenState.error) {
      message = tokenState.error.message;
    }

    if (tokenState.data) {
      if (tokenState.data && tokenState.data.verifyRegistration) {
        message =
          'Gratulujeme, Vaše emailová adresa byla ověřena, můžete se přihlásit.';
      } else {
        message = 'Váš email se nepodařilo ověřit.';
      }
    }
  }

  return (
    <div className="appWrapper">
      <h1>Verification Page</h1>
      <p>{message}</p>
    </div>
  );
}
