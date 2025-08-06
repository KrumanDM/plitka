import React, { useEffect, useState } from "react";
import { BagsButton } from "pages/Accessories/Bags/BagsButton";
import { HatsButton } from "pages/Accessories/Hats/HatsButton";
import { SocksButton } from "pages/Accessories/Socks/SocksButton";
import s from "./SidebarAccessories.module.css"

type SidebarProps = {
  onClickOutside: () => void;
};

export const SidebarAccessories = ({ onClickOutside }:SidebarProps) => {
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
    <div className={s.accessoriesContainer}>
    <div onClick={handleClick} 
    className={isOpen1 ? s.open : ""}>
    <div
className={`${s.sidebarItem} ${isOpen1 && isSelected ? s.selected : ""}`}
>
      Accessories
      </div>
      {isOpen1 && (
        <div className={s.slide}>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <BagsButton/>
          </div>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <HatsButton/>
          </div>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <SocksButton/>
          </div>
        </div>
        
      )}
    </div>
    </div>
    
  );
};

