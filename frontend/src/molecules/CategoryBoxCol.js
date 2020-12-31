import React from "react";
import { CategoryBoxGrid } from "src/molecules/";
import { Col } from "react-bootstrap";

export function CategoryBoxCol({selectedCategory, selectCategory}) {
  return (
    <Col className="justify-content-center text-center mt-5">
      <div>
        <h1>ZVOLTE KATEGORII A ZAČNĚTE SPORTOVAT</h1>
      </div>
      <CategoryBoxGrid selectedCategory={selectedCategory} selectCategory={selectCategory}/>
    </Col>
  );
}
