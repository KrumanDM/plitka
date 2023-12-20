import React, { useState } from "react";
import { Complites } from "./Complites/Complites";
import { Decks } from "./Decks/Decks";
import s from "./Skate.module.css";
import { Trucks } from "./Trucks/Trucks";

export const Skate = () => {
  // Создаем переменную состояния для хранения видимости блока меню
  const [showMenu, setShowMenu] = useState(false);

  // Создаем функцию для показа блока меню при наведении на ссылку
  const showMenuHandler = () => {
    setShowMenu(true);
  };

  // Создаем функцию для скрытия блока меню при убирании мыши с блока
  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <div className={s.clothingContainer}>
      <a
        // Добавляем обработчик события onMouseOver для показа блока меню
        onMouseOver={showMenuHandler}
        className={s.clothingContainer}
        href={"/#"}
      >
        Скейт
      </a>
      {/* Добавляем условный рендеринг для блока меню в зависимости от состояния showMenu */}
      {showMenu && (
        <div
          // Добавляем обработчик события onMouseLeave для скрытия блока меню
          onMouseLeave={hideMenuHandler}
          className={s.menu}
        >
          <Decks />
          <Complites />
          <Trucks />
        </div>
      )}
    </div>
  );
};