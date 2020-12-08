import React from "react";
import { CategoryBox } from "src/atoms/";

const categories = [
  {
    color: "#B9E0EE",
    imgUrl: "/images/icons/aerialYoga.png",
    children: <>aerial jóga</>,
  },
  {
    color: "#ACE2D8",
    imgUrl: "/images/icons/gravidYoga.png",
    children: <>gravid jóga</>,
  },
  {
    color: "#DBF6E9",
    imgUrl: "/images/icons/hotYoga.png",
    children: <>hot jóga</>,
  },
  {
    color: "#FCF6D1",
    imgUrl: "/images/icons/stralaYoga.png",
    children: <>strala jóga</>,
  },
  {
    color: "#F6DEDA",
    imgUrl: "/images/icons/jogaProZacatecniky.png",
    children: <>jóga pro začátečníky</>,
  },
  {
    color: "#C16868",
    imgUrl: "/images/icons/bodyPump.png",
    children: <>body pump</>,
  },
  {
    color: "#ED8F8B",
    imgUrl: "/images/icons/kravMaga.png",
    children: <>krav maga</>,
  },
  {
    color: "#EEACAC",
    imgUrl: "/images/icons/thaiBox.png",
    children: <>thai box</>,
  },
  {
    color: "#F8BB97",
    imgUrl: "/images/icons/kruhovyTrenink.png",
    children: <>kruhový trénink</>,
  },
  {
    color: "#F3D8C8",
    imgUrl: "/images/icons/soukromeLekce.png",
    children: <>soukromé lekce</>,
  },
  {
    color: "#A4A0C3",
    imgUrl: "/images/icons/sportovniAerobik.png",
    children: <>sportovní aerobik</>,
  },
  {
    color: "#C3D2EB",
    imgUrl: "/images/icons/pilates.png",
    children: <>pilates</>,
  },
  {
    color: "#ACDBEA",
    imgUrl: "/images/icons/plavani.png",
    children: <>plavání</>,
  },
  {
    color: "#EAC0CE",
    imgUrl: "/images/icons/poleDance.png",
    children: <>pole dance</>,
  },
  {
    color: "#C7D4EC",
    imgUrl: "/images/icons/zumba.png",
    children: <>zumba</>,
  },
];

export function CategoryBoxGrid() {
  return (
    <div className="d-flex justify-content-center align-items-start flex-wrap">
      {categories.map((category) => {
        return (
          <CategoryBox
            key={category.imgUrl}
            color={category.color}
            img={category.imgUrl}
          >
            {category.children}
          </CategoryBox>
        );
      })}
    </div>
  );
}
