import React, { useRef, useState } from "react";
import { Text } from "vcc-ui";

import styles from '../../public/css/home.module.css'

import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import PaginationDesktop from "./PaginationDesktop";
import { Spacer } from "./Spacer";

export const HomeComponent: React.FC = () => {

  const { cars } = useCars()

  const cardListRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const cardSize = 24;

  const Navigate = (left: boolean) => {
    const newScrollPosition = left ? scrollPosition - cardSize : scrollPosition + cardSize;

    if (cardListRef.current && newScrollPosition >= 0 && newScrollPosition <= cardListRef.current.scrollWidth - (cardListRef.current.clientWidth || 0)) {
      setScrollPosition(newScrollPosition);
      cardListRef.current.scrollTo({ left: newScrollPosition });
    }
  }

  return (
    <div className={styles.homeWrapper}>
      <Text variant="cook">Todos os modelos Recharge</Text>
      <Spacer></Spacer>
      <div className={styles.cardsWrapper} id="card-list" ref={cardListRef}>
        {cars.map(car => <CarCard key={car.id} car={car}/>)}
      </div>
      <PaginationDesktop onClickLeft={() => Navigate(true)} onClickRight={() => Navigate(false)}/>
    </div>    
  );
};
