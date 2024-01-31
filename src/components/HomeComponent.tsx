import React from "react";
import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";

export const HomeComponent: React.FC = () => {

  const { cars } = useCars()

  console.log(cars)

  return (
    <div>
      {cars.map(car => <CarCard key={car.id} car={car}/>)}
    </div>    
  );
};
