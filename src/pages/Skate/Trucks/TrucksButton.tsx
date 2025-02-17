import React from "react";
import s from "./TrucksButton.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const TrucksButton = () => {
  return <div className={s.trucksButtonContainer}>
  <button className={s.trucksButton}>
      <Link to="/trucks" className={s.trucksLink}>Trucks</Link>
  </button> 
</div>
} 