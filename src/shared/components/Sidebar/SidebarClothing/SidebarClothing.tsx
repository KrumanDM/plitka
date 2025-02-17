import React, { useEffect, useState } from "react";
import { Hoodies } from "../../../../Header/Clothing/Hoodies/Hoodies";
import { Jackets } from "../../../../Header/Clothing/Jackets/Jackets";
import { SweatersButton } from "../../../../Header/Clothing/Sweaters/SweatersButton";
import s from "./SidebarClothing.module.css";

type SidebarProps = {
  onClickOutside: () => void;
};

export const SidebarClothing = ({ onClickOutside }:SidebarProps) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [wasOpen, setWasOpen] = useState(false);
  
  const handleClick = () => {
    if (isOpen1) {
      if (wasOpen) {
        onClickOutside();
      } else {
        setIsOpen1(false);
        setSelected(false);
      }
    } else {
      setIsOpen1(true);
      setSelected(true);
      setWasOpen(false);
    }
  };

  const closeIfSiteHere = () =>{
    onClickOutside();
}

  return (
    <div className={s.clothingContainer}>
    <div onClick={handleClick} 
    className={isOpen1 ? s.open : ""}>
    <div
  className={`${s.sidebarItem} ${isOpen1 && isSelected ? s.selected : ""}`}
>
      Clothing
      </div>
      {isOpen1 && (
        <div onClick={closeIfSiteHere} className={s.slide}>
          <div className={s.buttonContainer}>
          <Jackets />
          </div>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <SweatersButton />
          </div>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <Hoodies />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};
