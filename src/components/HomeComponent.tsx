import React, { useRef, useState } from "react";
import { Text } from "vcc-ui";

import styles from '../../public/css/home.module.css'

import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import PaginationDesktop from "./PaginationDesktop";
import PaginationMobile from "./PaginationMobile";
import { Spacer } from "./Spacer";

export const HomeComponent: React.FC = () => {

  const { cars } = useCars()

  const cardListRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0)
  const cardSize = 24;

  const Navigate = (left: boolean) => {
    const newScrollPosition = left ? scrollPosition - cardSize : scrollPosition + cardSize;

    if (cardListRef.current) {
      // Arredonda a nova posição para garantir que a rolagem seja no tamanho exato do cartão
      const roundedPosition = Math.round(newScrollPosition / cardSize) * cardSize;

      if (roundedPosition >= 0 && roundedPosition <= cardListRef.current.scrollWidth - cardListRef.current.clientWidth) {
        setScrollPosition(roundedPosition);
        cardListRef.current.scrollTo({ left: roundedPosition });
      }
    }
  }

  const navigateMobile = (index: number) => {
    let cardList = document.getElementById("card-list");
    let card = cardList?.firstElementChild;
    let cardSize = (card?.clientWidth ?? 0) + 24;
    let scrollSize = cardList?.scrollWidth ?? 0;
    let scrollPosition = cardList?.scrollLeft ?? 0;

    cardList?.scrollTo({ left: index * cardSize})
    setSelected(index);
  }

  return (
    <div className={styles.homeWrapper}>
      <Text variant="cook">Todos os modelos Recharge</Text>
      <Spacer></Spacer>
      <div className={styles.cardsWrapper} id="card-list" ref={cardListRef}>
        {cars.map(car => <CarCard key={car.id} car={car}/>)}
      </div>
      <PaginationDesktop onClickLeft={() => Navigate(true)} onClickRight={() => Navigate(false)}/>
      <PaginationMobile selected={selected} onClick={navigateMobile} total={cars.length}/>
    </div>    
  );
};
