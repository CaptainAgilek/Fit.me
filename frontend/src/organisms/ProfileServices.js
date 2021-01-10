import React, { useState } from "react";
import { CategoryBox, Loading } from "../atoms";
import { ErrorBanner, DeleteButton } from "../molecules";
import { Button, Container, Modal } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

export function ProfileServices({ servicesState, user_id }) {
  // console.log('user_id: ', user_id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const categories = [
    {
      id: 6,
      color: "#B9E0EE",
      imgUrl: "/images/icons/aerialYoga.png",
      children: <>aerial jóga</>,
    },
    {
      id: 7,
      color: "#ACE2D8",
      imgUrl: "/images/icons/gravidYoga.png",
      children: <>gravid jóga</>,
    },
    {
      id: 8,
      color: "#DBF6E9",
      imgUrl: "/images/icons/hotYoga.png",
      children: <>hot jóga</>,
    },
    {
      id: 9,
      color: "#FCF6D1",
      imgUrl: "/images/icons/stralaYoga.png",
      children: <>strala jóga</>,
    },
    {
      id: 10,
      color: "#F6DEDA",
      imgUrl: "/images/icons/jogaProZacatecniky.png",
      children: <>jóga pro začátečníky</>,
    },
    {
      id: 11,
      color: "#C16868",
      imgUrl: "/images/icons/bodyPump.png",
      children: <>body pump</>,
    },
    {
      id: 12,
      color: "#ED8F8B",
      imgUrl: "/images/icons/kravMaga.png",
      children: <>krav maga</>,
    },
    {
      id: 13,
      color: "#EEACAC",
      imgUrl: "/images/icons/thaiBox.png",
      children: <>thai box</>,
    },
    {
      id: 14,
      color: "#F8BB97",
      imgUrl: "/images/icons/kruhovyTrenink.png",
      children: <>kruhový trénink</>,
    },
    {
      id: 15,
      color: "#F3D8C8",
      imgUrl: "/images/icons/soukromeLekce.png",
      children: <>soukromé lekce</>,
    },
    {
      id: 16,
      color: "#A4A0C3",
      imgUrl: "/images/icons/sportovniAerobik.png",
      children: <>sportovní aerobik</>,
    },
    {
      id: 17,
      color: "#C3D2EB",
      imgUrl: "/images/icons/pilates.png",
      children: <>pilates</>,
    },
    {
      id: 18,
      color: "#ACDBEA",
      imgUrl: "/images/icons/plavani.png",
      children: <>plavání</>,
    },
    {
      id: 19,
      color: "#EAC0CE",
      imgUrl: "/images/icons/poleDance.png",
      children: <>pole dance</>,
    },
    {
      id: 20,
      color: "#C7D4EC",
      imgUrl: "/images/icons/zumba.png",
      children: <>zumba</>,
    },
  ];

  const SERVICE_MUTATION = gql`
    mutation insertUserService($input: CreateOrUpdateServiceInput!) {
      insertUserService(input: $input)
    }
  `;

  const DELETE_SERVICE = gql`
    mutation deleteUserService($user_id: Int!, $service_id: Int!) {
      deleteUserService(user_id: $user_id, service_id: $service_id)
    }
  `;

  const [serviceRequest] = useMutation(SERVICE_MUTATION, {
    onCompleted: () => {
      setShow(false);
      servicesState.refetch();
      // setActionSuccess({ message: "Akce byla uložena.", variant: "success" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [deleteServiceRequest] = useMutation(DELETE_SERVICE, {
    onCompleted: () => {
      servicesState.refetch();
      // setActionSuccess({ message: "Akce byla smazána.", variant: "success" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!user_id || (servicesState.loading && !servicesState.data)) {
    return <Loading />;
  }

  let tmpList = [];
  let servicesList = [];
  let availableCategories = [];
  if (servicesState.data) {
    tmpList = servicesState.data.servicesForUser;

    tmpList.forEach((service) => {
      categories.forEach((category) => {
        if (category.id === service.service_id) {
          servicesList.push({
            key: service.service_id,
            service_id: service.service_id,
            user_id: service.user_id,
            name: service.name,
            description: service.description,
            color: category.color,
            imageUrl: category.imgUrl,
            children: category.children,
          });
        }
      });
    });

    categories.forEach((category) => {
      if (servicesList.some((service) => service.service_id === category.id)) {
        // availableCategories.push(category);
      } else {
        availableCategories.push(category);
      }
    });
  }

  return (
    <Container>
      {servicesState.loading && <Loading />}
      {servicesState.error && (
        <ErrorBanner message={servicesState.error.message} />
      )}

      {/*List of services*/}
      {servicesState && servicesState.data && user_id && (
        <div className="d-flex justify-content-center align-items-start flex-wrap text-center">
          {servicesList.map((service) => {
            return (
              <>
                <CategoryBox
                  key={service.service_id}
                  color={service.color}
                  img={service.imageUrl}
                >
                  <DeleteButton
                    handleRemove={() =>
                      deleteServiceRequest({
                        variables: {
                          user_id: service.user_id,
                          service_id: service.service_id,
                        },
                      })
                    }
                    name={service.name}
                    imageClassname="service-delete-icon filter-none"
                  ></DeleteButton>
                  {service.children}
                </CategoryBox>
              </>
            );
          })}
          {/*add new*/}
          <div className="category-box align-items-center" onClick={handleShow}>
            <img
              className="img-fluid align-content-center"
              src={"/images/plus.png"}
              alt="Přidat službu"
            />
          </div>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-start flex-wrap">
            {availableCategories.map((category) => {
              return (
                <div
                  onClick={() => {
                    serviceRequest({
                      variables: {
                        input: {
                          user_id: user_id,
                          service_id: category.id,
                        },
                      },
                    });
                  }}
                >
                  <CategoryBox
                    key={category.imgUrl}
                    color={category.color}
                    img={category.imgUrl}
                  >
                    {category.children}
                  </CategoryBox>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zavřít
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
