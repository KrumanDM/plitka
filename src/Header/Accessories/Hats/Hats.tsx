import React from "react";
import s from "./Hats.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Hats = () => {
  return <div className={s.hatsButtonContainer}>
  <button className={s.hatsButton}>
      <Link to="/hats" className={s.hatsLink}>Hats</Link>
  </button> 
</div>
} 