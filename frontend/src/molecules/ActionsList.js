import React from "react";
import { Loading } from "src/atoms/";
import { ActionCard } from "src/molecules/";
import ListGroup from "react-bootstrap/ListGroup";

export function ActionsList({
  organizationData,
  organizationLoading,
  actions,
  actionsState,
  editable,
  setActionSuccess,
}) {
  if (
    (organizationLoading && !organizationData) ||
    (actionsState.loading && !actionsState.data)
  ) {
    return <Loading />;
  }
  if (!actionsState.data || !organizationData) return <div />;
  let actionsList = actions;
  if (editable) {
    const defaultAction = {
      time: "10:00:00",
      date: `${new Date().getTime()}`,
      price: 200,
      name: "Název akce",
      action_id: null,
      place_id: organizationData.organization.places[0].place_id,
      photo_id: null,
      trainer_id:
        (organizationData.organization.trainers.length > 0 &&
          organizationData.organization.trainers[0].user_id) ||
        0,
      max_capacity: 10,
    };
    actionsList = [defaultAction, ...actions];
  }
  return (
    <ListGroup horizontal className="horizontalScroll">
      {organizationData &&
        actionsState.data &&
        actionsList.map((action) => (
          <ListGroup.Item
            key={action.action_id}
            className="borderNone"
            style={{ paddingLeft: "0.01rem" }}
          >
            <ActionCard
              key={action.action_id}
              img={(action.photo && action.photo.url) || "/images/add_img.png"}
              action={action}
              trainers={organizationData.organization.trainers}
              user_id={organizationData.organization.user_id}
              editable={true}
              actionsState={actionsState}
              setActionSuccess={setActionSuccess}
            />
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
