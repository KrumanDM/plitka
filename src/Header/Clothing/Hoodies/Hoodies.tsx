import React from "react";
import { Link } from "react-router-dom";
import s from "./Hoodies.module.css";

export const Hoodies = () => {
  return (
    <div className={s.hoodiesContainer}>
      <Link to="/hoodies">Jackets</Link>
    </div>
  );
};