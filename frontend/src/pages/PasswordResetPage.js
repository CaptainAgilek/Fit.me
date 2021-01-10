import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Navigation } from "src/organisms/";
import { ResetPasswordForm, CustomAlert } from "src/atoms/";
import { decodeToken } from "src/utils/jwt";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

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

    const [updatePasswordRequest] = useMutation(
        UPDATE_PASSWORD,
        {
            onCompleted: () => {
                setActionSuccess({
                    message: "Heslo bylo resetováno.",
                    variant: "success",
                });
            },
        },
        {
            onError: () => {
                setActionSuccess({
                    message: "Chyba při resetu hesla.",
                    variant: "danger",
                });
            },
        }
    );

    useEffect(() => {
        tokenStateRequest({ variables: { token } });
    }, [token]);

    let message = getMessage(token, tokenState);

    const [actionSuccess, setActionSuccess] = useState(false);

    const passwordResetSuccessfully = async () => {
        await new Promise(res => setTimeout(res, 2000));
        history.push("/");
    }

    if (tokenState.data && tokenState.data.verifyPasswordReset) {
        return <Container><div id="alerts" className="fixed-top mt-1">
            {
                <CustomAlert
                    headingText={actionSuccess.message}
                    setActionSuccess={setActionSuccess}
                    variant={actionSuccess.variant}
                />
            }
        </div><ResetPasswordForm userEmail={email} onSubmit={updatePasswordRequest} handleClose={() => passwordResetSuccessfully()}></ResetPasswordForm></Container>;
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
