import React from "react";
import s from "./BagsButton.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const BagsButton = () => {
  return <div className={s.bagsButtonContainer}>
  <button className={s.bagsButton}>
      <Link to="/bags" className={s.bagsLink}>Bags</Link>
  </button> 
</div>
}