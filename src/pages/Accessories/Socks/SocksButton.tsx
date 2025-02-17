import React from "react";
import s from "./SocksButton.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const SocksButton = () => {
  return <div className={s.socksButtonContainer}>
  <button className={s.socksButton}>
      <Link to="/socks" className={s.socksLink}>Socks</Link>
  </button> 
</div>
} 
 