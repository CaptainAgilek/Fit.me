import React from "react";
import { Row, Card, Button, Image } from "react-bootstrap";
import PaginationList from "react-pagination-list";
import { route } from "src/Routes";

export function OrganizationPaginationList({ foundOrganizations }) {
  return (
    <PaginationList
      data={foundOrganizations}
      pageSize={5}
      renderItem={(item, key) => (
        <Card key={key} className="mb-3">
          <div className="d-flex">
            <Card.Img
              variant="top"
              src={
                item.profile_photo
                  ? item.profile_photo.url
                  : "https://cdn.onlinewebfonts.com/svg/img_506952.png"
              }
              style={{ width: "25%", textAlign: "left" }}
            />
            <div
              style={{
                textAlign: "left",
                padding: "10px",
                width: "100%",
              }}
            >
              <Card.Title>{item.organization_name}</Card.Title>
              <Card.Text>
                <Row className="m-0">
                  {[...Array(5)].map((star, index) => (
                    <div
                      className={
                        "organization-detail-rating-star" +
                        (index + 1 <= item.avgSum ? " star-full" : "")
                      }
                      key={index}
                    >
                      <Image
                        src={
                          "/images/icons/" +
                          (index + 1 <= item.avgSum
                            ? "star-solid.svg"
                            : "star-regular.svg")
                        }
                        style={{ width: "23px" }}
                      ></Image>
                    </div>
                  ))}
                </Row>

                <a
                  href={
                    route.organizationDetailPage() +
                    "?organizationId=" +
                    item.user_id
                  }
                  target="_blank"
                >
                  <Button
                    variant="primary"
                    style={{ float: "right" }}
                    className="mt-5"
                  >
                    Detail
                  </Button>
                </a>
              </Card.Text>
            </div>
          </div>
        </Card>
      )}
    />
  );
}
