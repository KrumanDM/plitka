import React, { MouseEventHandler, useState } from "react";
import { ComplitesButton } from "../Complites/ComplitesButton";

import { DecksButton } from "../Decks/DecksButton";

import s from "./SkateButton.module.css";
import { TrucksButton } from "../Trucks/TrucksButton";
;

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

  const linkClickHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    showMenuHandler();
  };
  

  return (
    <>
    <button className={s.skateContainer}>
      <a
        // Добавляем обработчик события onMouseOver для показа блока меню
        onMouseOver={showMenuHandler}
        onClick={linkClickHandler}
        className={s.skateContainer}
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
          
          <DecksButton />
          <ComplitesButton />
          <TrucksButton />
        </div>
      )}
    </button>
    </>
  );
};