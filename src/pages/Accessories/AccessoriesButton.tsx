import React, { useState } from "react";

import s from "./AccessoriesButton.module.css";
import { BagsButton } from "./Bags/BagsButton";
import { HatsButton } from "./Hats/HatsButton";
import { SocksButton } from "./Socks/SocksButton";

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
        Аксессуары
      </a>
      
      {/* Добавляем условный рендеринг для блока меню в зависимости от состояния showMenu */}
      {showMenu && (
        <div
          // Добавляем обработчик события onMouseLeave для скрытия блока меню
          onMouseLeave={hideMenuHandler}
          className={s.menu}
        >
          <BagsButton />
          <HatsButton />
          <SocksButton />
          
        </div>
      )}
    </button>
    </>
  );
};
