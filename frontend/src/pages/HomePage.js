import React from 'react';
import { TopNavigation } from 'src/organisms/';
import { LandingSlideshow, CategoryBoxGrid } from 'src/molecules/';
import { Row, Col, Container } from 'react-bootstrap';
export function HomePage() {
  return (
    <>
      <TopNavigation />
      <LandingSlideshow />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col
            className="read-more-img"
            style={{ backgroundImage: `url(images/yoga_sitting.jpg)` }}
          >
            <div className="read-more-container">
              <h3>Jste sportovní nadšenec, trenér nebo organizace?</h3>
              <p>
                Chcete své služby propagovat, rezervovat termín své oblíbené
                lekce, najít volné studio na základě Vaší lokace?
              </p>
              <br />
              <h4>DÍKY FIT.ME TOHO DOKÁŽETE MNOHO.</h4>
              <h4>A TO VŠE NA JEDNOM MÍSTĚ. </h4>
              <Row className="justify-content-center mt-3">
                <a href="/aboutpage">
                  <button className="btn-attractive" type="button">
                    Přečtěte si více
                  </button>
                </a>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-center text-center mt-5">
            <div>
              <h1>ZVOLTE KATEGORII A ZAČNĚTE SPORTOVAT</h1>
            </div>
            <CategoryBoxGrid/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
