import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import { OrganizationDetailTemplate } from "src/templates/OrganizationDetailTemplate";
import { useAuth } from "src/utils/auth";

export function OrganizationDetailPage() {
    const { user } = useAuth();
    const history = useHistory();




    return (
        <>
            <OrganizationDetailTemplate />
        </>
    );
}
