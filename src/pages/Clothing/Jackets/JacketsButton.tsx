import React from "react";
import { Link } from "react-router-dom";
import s from "./JacketsButton.module.css";

export const JacketsButton = () => {
  return <div className={s.jacketsButtonContainer}>
  <button className={s.jacketsButton}>
      <Link to="/jackets" className={s.jacketsLink}>Jackets</Link>
  </button> 
</div>
} 