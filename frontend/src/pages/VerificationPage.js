import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { route } from 'src/Routes';
import { Redirect } from "react-router-dom";
import { TopNavigation } from 'src/organisms/';

const VERIFY_REGISTRATION_MUTATION = gql`
  mutation VerifyRegistration($token: String!) {
    verifyRegistration(token: $token)
  }
`;

export function VerificationPage(props) {
  var params = new URLSearchParams(props.location.search);
  const token = params.get('token');

  const [tokenStateRequest, tokenState] = useMutation(
    VERIFY_REGISTRATION_MUTATION,
  );
  useEffect(() => {
    tokenStateRequest({ variables: { token } });
  }, [token]);

  let message = getMessage(token, tokenState);

  if (tokenState.data && tokenState.data.verifyRegistration) {
    return <Redirect to={route.signIn()} />;
  }

  return (
    <>
    <TopNavigation/>
    <div className="appWrapper">
      <h1>Verification Page</h1>
      <p>{message}</p>
    </div>
    </>
  );
}

function getMessage(token, tokenState) {
  if (!token) {
    return 'Nebyl zadán token.';
  }

  if (token) {
    if (!tokenState.data && tokenState.loading) {
      return 'Loading...';
    }

    if (tokenState.error) {
      return tokenState.error.message;
    }

    if (!tokenState.data) {
      return 'Váš email se nepodařilo ověřit.';
    }

    if (tokenState.data.verifyRegistration) {
      return 'Gratulujeme, Váš email je ověřený.';
    } else {
      return 'Váš email se nepodařilo ověřit.';
    }
  }

  return 'Nevalidní token ' + token;
}
