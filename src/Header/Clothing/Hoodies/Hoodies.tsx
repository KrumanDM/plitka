import React from "react";
import { Link } from "react-router-dom";
import s from "./Hoodies.module.css";

export const Hoodies = () => {
  return <div className={s.hoodiesButtonContainer}>
  <button className={s.hoodiesButton}>
      <Link to="/hoodies" className={s.hoodiesLink}>Hoodies</Link>
  </button> 
</div>
} 