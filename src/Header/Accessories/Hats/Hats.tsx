import React from "react";
import s from "./Hats.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Hats = () => {
  return (
    <div className={s.sweatersContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/hats">Hats</Link>
    </div>
  );
};