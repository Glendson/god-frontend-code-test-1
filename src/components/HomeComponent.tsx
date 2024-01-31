import React from "react";
import { Text } from "vcc-ui";

import styles from '../../public/css/home.module.css'

import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import { Spacer } from "./Spacer";

export const HomeComponent: React.FC = () => {

  const { cars } = useCars()

  return (
    <div className={styles.homeWrapper}>
      <Text variant="cook">Todos os modelos Recharge</Text>
      <Spacer></Spacer>
      <div className={styles.cardsWrapper} id="card-list">
        {cars.map(car => <CarCard key={car.id} car={car}/>)}
      </div>
      
    </div>    
  );
};
