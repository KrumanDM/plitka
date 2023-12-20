import React from "react";
import s from "./Decks.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Decks = () => {
  return (
    <div className={s.sweatersContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/decks">Decks</Link>
    </div>
  );
};