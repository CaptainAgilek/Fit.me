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

  return (
    <ListGroup horizontal className="horizontalScroll">
      {organizationData &&
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
              trainers={organizationData.organization.trainers}
              user_id={organizationData.organization.user_id}
              editable={true}
            />
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
