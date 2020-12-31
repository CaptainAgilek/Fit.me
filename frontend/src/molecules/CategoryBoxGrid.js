import React from "react";
import { CategoryBox } from "src/atoms/";

const categories = [
  {
    id: 0,
    color: "#B9E0EE",
    imgUrl: "/images/icons/aerialYoga.png",
    children: <>aerial jóga</>,
  },
  {
    id: 1,
    color: "#ACE2D8",
    imgUrl: "/images/icons/gravidYoga.png",
    children: <>gravid jóga</>,
  },
  {
    id: 2,
    color: "#DBF6E9",
    imgUrl: "/images/icons/hotYoga.png",
    children: <>hot jóga</>,
  },
  {
    id: 3,
    color: "#FCF6D1",
    imgUrl: "/images/icons/stralaYoga.png",
    children: <>strala jóga</>,
  },
  {
    id: 4,
    color: "#F6DEDA",
    imgUrl: "/images/icons/jogaProZacatecniky.png",
    children: <>jóga pro začátečníky</>,
  },
  {
    id: 5,
    color: "#C16868",
    imgUrl: "/images/icons/bodyPump.png",
    children: <>body pump</>,
  },
  {
    id: 6,
    color: "#ED8F8B",
    imgUrl: "/images/icons/kravMaga.png",
    children: <>krav maga</>,
  },
  {
    id: 7,
    color: "#EEACAC",
    imgUrl: "/images/icons/thaiBox.png",
    children: <>thai box</>,
  },
  {
    id: 8,
    color: "#F8BB97",
    imgUrl: "/images/icons/kruhovyTrenink.png",
    children: <>kruhový trénink</>,
  },
  {
    id: 9,
    color: "#F3D8C8",
    imgUrl: "/images/icons/soukromeLekce.png",
    children: <>soukromé lekce</>,
  },
  {
    id: 10,
    color: "#A4A0C3",
    imgUrl: "/images/icons/sportovniAerobik.png",
    children: <>sportovní aerobik</>,
  },
  {
    id: 11,
    color: "#C3D2EB",
    imgUrl: "/images/icons/pilates.png",
    children: <>pilates</>,
  },
  {
    id: 12,
    color: "#ACDBEA",
    imgUrl: "/images/icons/plavani.png",
    children: <>plavání</>,
  },
  {
    id: 13,
    color: "#EAC0CE",
    imgUrl: "/images/icons/poleDance.png",
    children: <>pole dance</>,
  },
  {
    id: 14,
    color: "#C7D4EC",
    imgUrl: "/images/icons/zumba.png",
    children: <>zumba</>,
  },
];

export function CategoryBoxGrid({ selectedCategory, selectCategory }) {
  return (
    <div className="d-flex justify-content-center align-items-start flex-wrap">
      {categories.map((category) => {
        return (
          <CategoryBox
            id={category.id}
            key={category.id}
            color={category.color}
            img={category.imgUrl}
            border={selectedCategory === category.id}
            handleCategoryClick={selectCategory}
          >
            {category.children}
          </CategoryBox>
        );
      })}
    </div>
  );
}
