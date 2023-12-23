import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Accessories } from "./Accessories/Accessories";
import { Clothing } from "./Clothing/Clothing";
import s from "./Header.module.css";
import SearchForm from "./Search/SearchForm";
import { Skate } from "./Skate/Skate";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';


export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open) // переключить open на противоположное значение
  }

  return (
    <div className={s.header}>
    <div className={s.headerContainer}>
      <div className={s.storeContainer}>
        <Clothing />
        <Accessories />
        <Skate />
      </div>
      <a className={s.logo} href="/plitka">
        Plitka
      </a>
      
      <div className={s.userContainer}>
      <div onClick={()=>handleOpen()} className={s.searchContainer}>
          {open && <SearchForm handleOpen={handleOpen}/>}
          <SearchIcon />
        </div>
        <div className={s.profile}>
        <Link to="/Profile">
          <AccountCircleIcon/>
        </Link>
        </div>
        <div className={s.busket}>
          <ShoppingBasketOutlinedIcon/>
        </div>
      </div>
    </div>
    </div>
  );
};

