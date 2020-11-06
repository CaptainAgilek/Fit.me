import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';
import { MailSendedPopUp } from '../atoms/MailSendedPopUp';

const SIGNUP_MUTATION = gql`
  mutation signUp(
    $username: String!
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
    $type: UserType!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
      type: $type
    ) {
      token
    }
  }
`;

export function SignUpPage() {
  const history = useHistory();
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup: { user, token } }) => {
      history.replace('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });


  let handleSignUpFormSubmit;
  handleSignUpFormSubmit = useCallback(
    (variables) => {
      signupRequest({
        variables: {
          username: variables.username,
          email: variables.email,
          password: variables.password,
          firstname: variables.firstname,
          lastname: variables.lastname,
          type: variables.type,
        },
      }).then((result) => {

      });
    },
    [signupRequest],
  );


  // if (signupRequestState.error === null) {
  if (true) {
    return (
      <MailSendedPopUp
        init={true}
      />
    );
  } else {
    return (
      <SignUpTemplate
        isLoading={signupRequestState.loading}
        error={signupRequestState.error}
        onSubmit={handleSignUpFormSubmit}
      />);
  }

}
