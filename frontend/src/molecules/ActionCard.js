 import React, { useCallback } from 'react';

import { gql, useMutation } from '@apollo/client';
import { ActionCardForm } from 'src/organisms/';

const ACTION_MUTATION = gql`
  mutation createOrUpdateAction($input: CreateOrUpdateActionInput!) {
    createOrUpdateAction(input: $input)
  }
`;

export function ActionCard({ img, action, trainers, user_id, editable }) {
  const [actionRequest, actionRequestState] = useMutation(ACTION_MUTATION, {
    onCompleted: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleActionSubmit = useCallback(
    (values) => {
      const [hours, minutes, seconds] = values.time.toTimeString().split(':');

      const deepCopyVariables = {
        time: hours + ':' + minutes,
        date: new String(values.date),
        price: parseFloat(values.price),
        name: values.name,
        action_id: action ? action.action_id : null,
        photo_id: action.photo_id,
        place_id: action.place_id,
        trainer_id: parseInt(values.trainer, 10),
        max_capacity: parseInt(values.max_capacity, 10),
      };
      if (!action.photo_id) {
        delete deepCopyVariables.photo_id;
      }
      actionRequest({ variables: { input: deepCopyVariables } });
    },
    [actionRequest],
  );

  let time = new Date();

  const options = trainers.map((trainer) => ({
    value: `${trainer.user_id}`,
    label: trainer.firstname + ' ' + trainer.lastname,
  }));

  if (action) {
    const [hours, minutes, seconds] = action.time.split(':');
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(seconds);
  }
  console.log("in action card ", action);
  const initialValues = {
    name: action.name,
    date: parseInt(action.date) || new Date(),
    time: time || new Date(),
    trainer:
      options.find((option) => option.value === `${action.trainer_id}`).value ||
      '',
    price: action.price || '',
    max_capacity: action.max_capacity || '',
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
      photo_id={action.photo_id || null}
    />
  );
}
