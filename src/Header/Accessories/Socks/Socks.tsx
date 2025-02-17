import React from "react";
import s from "./Socks.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Socks = () => {
  return <div className={s.socksButtonContainer}>
  <button className={s.socksButton}>
      <Link to="/socks" className={s.socksLink}>Socks</Link>
  </button> 
</div>
} 
 