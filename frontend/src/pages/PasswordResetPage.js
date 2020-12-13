import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { route } from "src/Routes";
import { Redirect } from "react-router-dom";
import { Navigation } from "src/organisms/";
import { ResetPasswordForm } from "src/atoms/";
import { decodeToken } from "src/utils/jwt";
import { useHistory } from "react-router-dom";

const VERIFY_PASSWORD_RESET_MUTATION = gql`
  mutation VerifyPasswordReset($token: String!) {
    verifyPasswordReset(token: $token)
  }
`;

const UPDATE_PASSWORD = gql`
  mutation newPassword($email: String!, $newPassword: String!, $newPasswordAgain: String!) {
      newPassword(email: $email, newPassword: $newPassword, newPasswordAgain: $newPasswordAgain)
  }
`;

export function PasswordResetPage(props) {
    var params = new URLSearchParams(props.location.search);
    const token = params.get("token");

    const email = decodeToken(token).email;

    const history = useHistory();

    const [tokenStateRequest, tokenState] = useMutation(
        VERIFY_PASSWORD_RESET_MUTATION
    );

    const [updatePasswordRequest, updatePasswordRequestState] = useMutation(
        UPDATE_PASSWORD
    );

    useEffect(() => {
        tokenStateRequest({ variables: { token } });
    }, [token]);

    let message = getMessage(token, tokenState);

    if (tokenState.data && tokenState.data.verifyPasswordReset) {
        return <ResetPasswordForm userEmail={email} onSubmit={updatePasswordRequest} handleClose={() => history.push("/")}></ResetPasswordForm>;
    }

    return (
        <>
            <Navigation />
            <div className="appWrapper">
                <h1>Resetování hesla</h1>
                <p>{message}</p>
            </div>
        </>
    );
};

function getMessage(token, tokenState) {
    if (!token) {
        return "Nebyl zadán token.";
    }

    if (token) {
        if (!tokenState.data && tokenState.loading) {
            return "Loading...";
        }

        if (tokenState.error) {
            return tokenState.error.message;
        }

        if (!tokenState.data) {
            return "Vaše heslo se nepodařilo změnit.";
        }

        if (!tokenState.data.verifyPasswordReset) {
            //bad token
            return "Neplatný token.";
        }
    }

    return "Nevalidní token " + token;
}