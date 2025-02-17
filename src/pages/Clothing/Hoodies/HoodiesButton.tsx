import React from "react";
import { Link } from "react-router-dom";
import s from "./HoodiesButton.module.css";

export const HoodiesButton = () => {
  return <div className={s.hoodiesButtonContainer}>
  <button className={s.hoodiesButton}>
      <Link to="/hoodies" className={s.hoodiesLink}>Hoodies</Link>
  </button> 
</div>
} 