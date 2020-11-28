import React from 'react';
import { Loading } from 'src/atoms/';
import { ActionCard } from 'src/molecules/';
import ListGroup from 'react-bootstrap/ListGroup';

export function ActionsList({
  organizationData,
  organizationLoading,
  actionsState,
  editable
}) {
  if (
    (organizationLoading && !organizationData) ||
    (actionsState.loading && !actionsState.data)
  ) {
    return <Loading />;
  }
  if (!actionsState.data || !organizationState.data) return <div />;

  let actions = actionsState.data.actionsForPlace;

  if (editable) {
    const defaultAction = {
      time: '10' + ':' + '00' + ':' + '00',
      date: new Date(),
      price: 200,
      name: 'Název akce',
      action_id: null,
      photo_id: null,
      trainer_id: organizationState.data.organization.trainers[0].user_id || 0,
      max_capacity: 10,
    };
    actions = [defaultAction, ...actionsState.data.actionsForPlace];
    console.log('actions ', actions);
  }
  return (
    <ListGroup horizontal className="horizontalScroll">
      {organizationData &&
        actionsState.data &&
        actions.map((action) => (
          <ListGroup.Item
            key={action.action_id}
            className="borderNone"
            style={{ paddingLeft: '0.1rem' }}
          >
            <ActionCard
              key={action.action_id}
              img={(action.photo && action.photo.url) || '/images/add_img.png'}
              action={action}
              trainers={organizationData.organization.trainers}
              user_id={organizationData.organization.user_id}
              editable={true}
            />
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
