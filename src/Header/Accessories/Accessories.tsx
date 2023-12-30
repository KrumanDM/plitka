import React, { useState } from "react";
import s from "./Accessories.module.css";
import { Bags } from "./Bags/Bags";
import { Hats } from "./Hats/Hats";
import { Socks } from "./Socks/Socks";

export const Accessories = () => {
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
        Аксессуары
      </a>
      {/* Добавляем условный рендеринг для блока меню в зависимости от состояния showMenu */}
      {showMenu && (
        <div
          // Добавляем обработчик события onMouseLeave для скрытия блока меню
          onMouseLeave={hideMenuHandler}
          className={s.menu}
        >
          <Bags />
          <Hats />
          <Socks />
        </div>
      )}
    </div>
  );
};
