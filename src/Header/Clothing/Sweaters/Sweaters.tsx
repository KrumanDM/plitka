import React from "react";
import s from "./Sweaters.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Sweaters = () => {
  return (
    <div className={s.sweatersContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/sweaters">Sweaters</Link>
    </div>
  );
};