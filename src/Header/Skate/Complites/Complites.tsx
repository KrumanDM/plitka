import React from "react";
import s from "./Complites.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Complites = () => {
  return (
    <div className={s.sweatersContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/complites">Complites</Link>
    </div>
  );
};