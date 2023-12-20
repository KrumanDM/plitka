import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Accessories } from "./Accessories/Accessories";
import { Clothing } from "./Clothing/Clothing";
import s from "./Header.module.css";
import SearchForm from "./Search/SearchForm";
import { Skate } from "./Skate/Skate";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open) // переключить open на противоположное значение
  }
  

  return (
    <div className={s.headerContainer}>
      <div className={s.storeContainer}>
        <Clothing />
        <Accessories />
        <Skate />
      </div>
      <a className={s.logo} href="/#">
        Plitka
      </a>
      
      <div className={s.userContainer}>
      <div onClick={()=>handleOpen()} className={s.searchContainer}>
          {open && <SearchForm handleOpen={handleOpen}/>}
          Поиск
        </div>
        <div className={s.profile}>
        <Link to="/Profile">Профиль</Link>
        </div>
        <div className={s.busket}>Корзина</div>
      </div>
    </div>
  );
};

