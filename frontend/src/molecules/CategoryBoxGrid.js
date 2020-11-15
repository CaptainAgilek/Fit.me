import React from 'react';
import { CategoryBox } from 'src/atoms/';

const sportColors = {
  aerialJoga: '#B9E0EE',
  gravidJoga: '#ACE2D8',
  hotJoga: '#DBF6E9',
  stralaJoga: '#FCF6D1',
  jogaProZacatecniky: '#F6DEDA',
  bodyPump: '#C16868',
  kravMaga: '#ED8F8B',
  thaiBox: '#EEACAC',
  kruhovyTrenink: '#F8BB97',
  soukromeLekce: '#F3D8C8',
  sportovniAerobik: '#A4A0C3',
  pilates: '#C3D2EB',
  plavani: '#ACDBEA',
  poleDance: '#EAC0CE',
  zumba: '#C7D4EC',
};

export function CategoryBoxGrid() {
  return (
    <div className="d-flex justify-content-center align-items-start flex-wrap">
      <CategoryBox color={sportColors.aerialJoga} img="/images/icons/aerialYoga.png">AERIAL JÓGA</CategoryBox>
      <CategoryBox color={sportColors.gravidJoga} img="/images/icons/gravidYoga.png">GRAVID JÓGA</CategoryBox>
      <CategoryBox color={sportColors.hotJoga} img="/images/icons/hotYoga.png">HOT JÓGA</CategoryBox>
      <CategoryBox color={sportColors.stralaJoga} img="/images/icons/stralaYoga.png">STRALA JÓGA</CategoryBox>
      <CategoryBox color={sportColors.jogaProZacatecniky} img="/images/icons/jogaProZacatecniky.png">
        JÓGA PRO ZAČÁTEČNÍKY
      </CategoryBox>
      <CategoryBox color={sportColors.bodyPump} img="/images/icons/bodyPump.png">BODY PUMP</CategoryBox>
      <CategoryBox color={sportColors.kravMaga} img="/images/icons/kravMaga.png">KRAV MAGA</CategoryBox>
      <CategoryBox color={sportColors.thaiBox} img="/images/icons/thaiBox.png">THAI BOX</CategoryBox>
      <CategoryBox color={sportColors.kruhovyTrenink} img="/images/icons/kruhovyTrenink.png">
        KRUHOVÝ TRÉNINK
      </CategoryBox>
      <CategoryBox color={sportColors.soukromeLekce} img="/images/icons/soukromeLekce.png">
        SOUKROMÉ LEKCE
      </CategoryBox>
      <CategoryBox color={sportColors.sportovniAerobik} img="/images/icons/sportovniAerobik.png">
        SPORTOVNÍ AEROBIK
      </CategoryBox>
      <CategoryBox color={sportColors.pilates} img="/images/icons/pilates.png">PILATES</CategoryBox>
      <CategoryBox color={sportColors.plavani} img="/images/icons/plavani.png">PLAVÁNÍ</CategoryBox>
      <CategoryBox color={sportColors.poleDance} img="/images/icons/poleDance.png">POLE DANCE</CategoryBox>
      <CategoryBox color={sportColors.zumba} img="/images/icons/zumba.png">ZUMBA</CategoryBox>
    </div>
  );
}
