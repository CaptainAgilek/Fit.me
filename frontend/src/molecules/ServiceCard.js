import React, { useCallback, useState } from 'react';
import { ServiceCardForm } from '../organisms';
import { gql, useMutation } from '@apollo/client';

const SERVICE_MUTATION = gql`
  mutation createOrUpdateService($input: CreateOrUpdateServiceInput!) {
    createOrUpdateService(input: $input)
  }
`;

const DELETE_SERVICE_MUTATION = gql`
  mutation deleteService($service_id: Int!) {
    deleteService(service_id: $service_id)
  }
`;

export function ServiceCard({
                              img,
                              editable,
                              service,
                              servicesState,
                              user_id,
                              setServiceSuccess,
                            }) {

  const [serviceRequest, serviceRequestState] = useMutation(SERVICE_MUTATION, {
    onCompleted: () => {
      servicesState.refetch();
      setServiceSuccess('Služba byla uložena.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [deleteServiceRequest, deleteServiceRequestState] = useMutation(DELETE_SERVICE_MUTATION, {
    onCompleted: () => {
      servicesState.refetch();
      setServiceSuccess('Služba byla smazána.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [photoId, setPhotoId] = useState(service.photo_id || null);

  const handleServiceSubmit = useCallback(
    (values) => {

      const deepCopyVariables = {
        name: values.name,
        description: values.description,
        service_id: service ? service.service_id : null,
        photo_id: photoId,
        place_id: service.place_id,
      };

      serviceRequest({ variables: { input: deepCopyVariables } });
    },
    [serviceRequest, photoId],
  );

  const initialValues = {
    name: service.name,
    description: service.description
  };

  return (
    <ServiceCardForm
      user_id={user_id}
      handleSubmit={handleServiceSubmit}
      service={service}
      img={img}
      initialValues={initialValues}
      photo_id={photoId}
      editable={editable}
      setPhotoId={setPhotoId}
      deleteServiceRequest={deleteServiceRequest}
    />
  );
}
