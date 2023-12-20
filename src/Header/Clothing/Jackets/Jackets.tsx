import React from "react";
import { Link } from "react-router-dom";
import s from "./Jackets.module.css";

export const Jackets = () => {
  return (
    <div className={s.jacketsContainer}>
      <Link to="/jackets">Jackets</Link>
    </div>
  );
};