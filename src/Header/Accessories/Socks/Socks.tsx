import React from "react";
import s from "./Socks.module.css";
// Импортируем компонент Link из react-router-dom
import { Link } from "react-router-dom";

export const Socks = () => {
  return (
    <div className={s.socksContainer}>
      {/* Оборачиваем текст в компонент Link и указываем путь /skateboard */}
      <Link to="/socks">Socks</Link>
    </div>
  );
};