import React from 'react';
import { Loading } from '../atoms';
import ListGroup from 'react-bootstrap/ListGroup';
import { ServiceCard } from './ServiceCard';

export function ServicesList({
                               organizationData,
                               organizationLoading,
                               servicesState,
                               editable,
                               setServiceSuccess,
                             }) {
  if (
    (organizationLoading && !organizationData) ||
    (servicesState.loading && !servicesState.data)
  ) {
    return <Loading />;
  }
  if (!servicesState.data || !organizationData) return <h1>neco</h1>;
  let servicesList = servicesState.data;
  console.log('toto');
  console.log(servicesState.data);
  if (editable) {
    const defaultService = {
      name: 'Titulek',
      description: 'Doplňující popis',
      service_id: null,
      place_id: organizationData.organization.places[0].place_id,
      photo_id: null,
    };
    servicesList = [defaultService, ...servicesState.data.servicesForPlace];
    console.log('services ', servicesList);
  }
  return (
    <ListGroup>
      {organizationData &&
      servicesList.map((service) => (
        <ListGroup.Item
          key={service.service_id}
          className="borderNone"
          style={{ paddingLeft: '0.1rem' }}
        >
          <ServiceCard
            key={service.service_id}
            img={(service.photo && service.photo.url) || '/images/add_img.png'}
            service={service}
            user_id={organizationData.organization.user_id}
            editable={true}
            servicesState={servicesState}
            setServiceSuccess={setServiceSuccess}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );


}
