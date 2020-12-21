import React from "react";
import { Row, Col } from "react-bootstrap";
import { route } from "src/Routes";

export function ReadMoreCol() {
  return (
    <Col
      className="read-more-img"
      style={{ backgroundImage: `url(images/yoga_sitting.jpg)` }}
    >
      <div className="read-more-container">
        <h3>Jste sportovní nadšenec, trenér nebo organizace?</h3>
        <p>
          Chcete své služby propagovat, rezervovat termín své oblíbené lekce,
          najít volné studio na základě Vaší lokace?
        </p>
        <br />
        <h4>DÍKY FIT.ME TOHO DOKÁŽETE MNOHO.</h4>
        <h4>A TO VŠE NA JEDNOM MÍSTĚ. </h4>
        <Row className="justify-content-center mt-3">
          <a href={route.about()}>
            <button className="btn-attractive" type="button">
              Přečtěte si více
            </button>
          </a>
        </Row>
      </div>
    </Col>
  );
}
