import React from "react";
import s from "./Trucks.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Trucks = () => {
  return (
    <div className={s.sweatersContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/trucks">Trucks</Link>
    </div>
  );
};