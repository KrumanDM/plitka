import React from "react";
import s from "./Bags.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Bags = () => {
  return (
    <div className={s.bagsContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/bags">Bags</Link>
    </div>
  );
};