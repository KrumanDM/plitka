import React, { MouseEventHandler, useState } from "react";
import { ComplitesButton } from "./Complites/ComplitesButton";

import { DecksButton } from "./Decks/DecksButton";

import s from "./SkateButton.module.css";
import { TrucksButton } from "./Trucks/TrucksButton";
;

export const Skate = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu(true);
  };

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