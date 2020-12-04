import React from "react";
import { CategoryBoxGrid } from "src/molecules/";
import { Col } from "react-bootstrap";

export function CategoryBoxCol() {
  return (
    <Col className="justify-content-center text-center mt-5">
      <div>
        <h1>ZVOLTE KATEGORII A ZAČNĚTE SPORTOVAT</h1>
      </div>
      <CategoryBoxGrid />
    </Col>
  );
}
