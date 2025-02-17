import React, { useState } from "react";
import s from "./ClothingButton.module.css";
import { Hoodies } from "../../../Header/Clothing/Hoodies/Hoodies";
import { Jackets } from "../../../Header/Clothing/Jackets/Jackets";
import { SweatersButton } from "../../../Header/Clothing/Sweaters/SweatersButton";



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
      {/* Добавляем условный рендеринг для блока меню в зависимости от состояния showMenu */}
      {showMenu && (
        <div
          // Добавляем обработчик события onMouseLeave для скрытия блока меню
          onMouseLeave={hideMenuHandler}
          className={s.menu}
        >
          <Jackets />
          <SweatersButton />
          <Hoodies />
          
        </div>
      )}
    </button>
    </>
  );
};
