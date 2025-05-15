import React, { useState } from "react";
import s from "./ClothingButton.module.css";
import { HoodiesButton } from "./Hoodies/HoodiesButton";
import { JacketsButton } from "./Jackets/JacketsButton";
import { SweatersButton } from "./Sweaters/SweatersButton";

export const Clothing = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu(true);
  };

  const hideMenuHandler = () => {
    setShowMenu(false);
  };
   // Предотвращаем переход по ссылке href={'#'}
   const linkClickHandler = (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    showMenuHandler();
  };

  return (
    <>
    <button className={s.clothingContainer}>
      <a
        // Добавляем обработчик события onMouseOver для показа блока меню
        onMouseOver={showMenuHandler}
        onClick={linkClickHandler}
        className={s.clothingContainer}
        href={"/#"}
      >
        Одежда
      </a>
      {showMenu && (
        <div
          // Добавляем обработчик события onMouseLeave для скрытия блока меню
          onMouseLeave={hideMenuHandler}
          className={s.menu}
        >
          <JacketsButton />
          <SweatersButton />
          <HoodiesButton />
          
        </div>
      )}
    </button>
    </>
  );
};
