import React from 'react';
import { Loading } from 'src/atoms/';
import { ActionCard } from 'src/molecules/';
import ListGroup from 'react-bootstrap/ListGroup';

export function ActionsList({ organizationState, actionsState, editable }) {
  if (
    (organizationState.loading && !organizationState.data) ||
    (actionsState.loading && !actionsState.data)
  ) {
    return <Loading />;
  }

  return (
    <ListGroup horizontal className="horizontalScroll">
      {organizationState.data &&
        actionsState.data &&
        actionsState.data.actionsForPlace.map((action) => (
          <ListGroup.Item
            key={action.action_id}
            className="borderNone"
            style={{ paddingLeft: '0.1rem' }}
          >
            <ActionCard
              key={action.action_id}
              img={action.photo.url || '/images/add_img.png'}
              action={action}
              trainers={organizationState.data.organization.trainers}
              user_id={organizationState.data.organization.user_id}
              editable={true}
            />
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
