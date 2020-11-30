import React from 'react';
import { Loading } from '../atoms';
import ListGroup from 'react-bootstrap/ListGroup';
import { ServiceCard } from './ServiceCard';

export function ServicesList({
                               organizationData,
                               organizationLoading,
                               services,
                               servicesState,
                               editable,
                             }) {
  // if (
  //   (organizationLoading && !organizationData) ||
  //   (servicesState.loading && !servicesState.data)
  // ) {
  //   return <Loading />;
  // }
  // if (!servicesState.data || !organizationData) return <div />;
  // let servicesList = services;
  // if (editable) {
  //   const defaultAction = {
  //     // time: '10' + ':' + '00' + ':' + '00',
  //     // date: `${new Date().getTime()}`,
  //     // price: 200,
  //     // name: 'Název akce',
  //     // action_id: null,
  //     // place_id: organizationData.organization.places[0].place_id,
  //     // photo_id: null,
  //     // trainer_id: (organizationData.organization.trainers.length>0  && organizationData.organization.trainers[0].user_id) || 0,
  //     // max_capacity: 10,
  //   };
  //   servicesList = [defaultAction, ...services];
  //   console.log('actions ', servicesList);
  // }
  return (
    <ListGroup>
      {/*// servicesList.map((service) => (*/}
      <ListGroup.Item
        // key={service.service_id}
        key={1}
        className="borderNone"
        style={{ paddingLeft: '0.1rem' }}
      >
        <ServiceCard
          // key={service.action_id}
          // img={(service.photo && service.photo.url) || '/images/add_img.png'}
          // service={service}
          // user_id={organizationData.organization.user_id}
          // editable={true}
          // servicesState={servicesState}
        />
      </ListGroup.Item>
    </ListGroup>
  );


}
