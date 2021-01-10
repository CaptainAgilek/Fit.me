import React, { useCallback, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { ActionCardForm } from "src/organisms/";

const ACTION_MUTATION = gql`
  mutation createOrUpdateAction($input: CreateOrUpdateActionInput!) {
    createOrUpdateAction(input: $input)
  }
`;

const DELETE_ACTION_MUTATION = gql`
  mutation deleteAction($action_id: Int!) {
    deleteAction(action_id: $action_id)
  }
`;

export function ActionCard({
  img,
  action,
  trainers,
  user_id,
  editable,
  actionsState,
  setActionSuccess,
}) {
  const [actionRequest] = useMutation(ACTION_MUTATION, {
    onCompleted: () => {
      actionsState.refetch();
      setActionSuccess({ message: "Akce byla uložena.", variant: "success" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [deleteActionRequest] = useMutation(DELETE_ACTION_MUTATION, {
    onCompleted: () => {
      actionsState.refetch();
      setActionSuccess({ message: "Akce byla smazána.", variant: "success" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [photoId, setPhotoId] = useState(action.photo_id || null);

  const handleActionSubmit = useCallback(
    (values) => {
      const [hours, minutes] = values.time.toTimeString().split(":");

      const deepCopyVariables = {
        time: hours + ":" + minutes,
        date: new Date(values.date).getTime().toString(),
        price: parseFloat(values.price),
        name: values.name,
        action_id: action ? action.action_id : null,
        photo_id: photoId,
        place_id: action.place_id,
        trainer_id: parseInt(values.trainer, 10),
        max_capacity: parseInt(values.max_capacity, 10),
      };

      actionRequest({ variables: { input: deepCopyVariables } });
    },
    [action,actionRequest, photoId]
  );

  let time = new Date();

  const options = trainers.map((trainer) => ({
    value: `${trainer.user_id}`,
    label: trainer.firstname + " " + trainer.lastname,
  }));

  if (action) {
    const [hours, minutes, seconds] = action.time.split(":");
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);
  }

  const initialValues = {
    name: action.name,
    date: parseInt(action.date),
    time: time || new Date(),
    trainer:
      (options.length > 0 &&
        action.trainer_id &&
        options.find((option) => option.value === `${action.trainer_id}`) &&
        options.find((option) => option.value === `${action.trainer_id}`)
          .value) ||
      `${action.trainer_id}`,
    price: action.price || "",
    max_capacity: action.max_capacity || "",
  };

  return (
    <ActionCardForm
      initialValues={initialValues}
      img={img}
      action={action}
      options={options}
      editable={editable}
      handleSubmit={handleActionSubmit}
      user_id={user_id}
      photo_id={photoId}
      setPhotoId={setPhotoId}
      deleteActionRequest={deleteActionRequest}
    />
  );
}
