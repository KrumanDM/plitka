import React, { useState } from "react";
import SuperSelect from "../SuperSelect/SuperSelect";
import s from "./Clothing.module.css";
import { Hoodies } from "./Hoodies/Hoodies";
import { Jackets } from "./Jackets/Jackets";
import { Sweaters } from "./Sweaters/Sweaters";

export const Clothing = () => {
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
        Одежда
      </a>
      {/* Добавляем условный рендеринг для блока меню в зависимости от состояния showMenu */}
      {showMenu && (
        <div
          // Добавляем обработчик события onMouseLeave для скрытия блока меню
          onMouseLeave={hideMenuHandler}
          className={s.menu}
        >
          <Jackets />
          <Sweaters />
          <Hoodies />
        </div>
      )}
    </div>
  );
};
