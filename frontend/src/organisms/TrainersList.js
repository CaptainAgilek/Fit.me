import React from "react";

import { Col, Carousel, Button } from "react-bootstrap";

import { TrainerCard } from "src/molecules/TrainerCard";
import { route } from "src/Routes";

export function TrainersList({ trainers }) {
  const makePairs = () => {
    let retVal = [];
    for (let i = 0; i < trainers.length; i++) {
      let tmp = [];
      tmp[0] = trainers[i];
      if (i + 1 < trainers.length) {
        tmp[1] = trainers[i + 1];
        retVal.push(tmp);
      } else {
        retVal.push(tmp);
        break;
      }
      i++;
    }

    return retVal;
  };

  const pairs = makePairs(trainers);

  //console.log(pairs, "pairs");

  return (
    <Col xl={6} lg={8} md={10} sm={10}>
      <Carousel
        indicators={true}
        controls={false}
        className="organization-detail-carousel-container"
      >
        {pairs.map((pair) => (
          <Carousel.Item
            className="organization-detail-trainers-carousel-item"
            key={pair[0].user_id}
          >
            {pair[0] && <TrainerCard trainer={pair[0]} order={1} />}
            {pair[1] && <TrainerCard trainer={pair[1]} order={2} />}
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  );
}
