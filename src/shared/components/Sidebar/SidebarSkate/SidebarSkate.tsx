import React, { useState } from "react";
import { ComplitesButton } from "../../../../pages/Skate/Complites/ComplitesButton";
import { DecksButton } from "../../../../pages/Skate/Decks/DecksButton";
import { TrucksButton } from "../../../../pages/Skate/Trucks/TrucksButton";
import s from "./SidebarSkate.module.css";

type SidebarProps = {
  onClickOutside: () => void;
};

export const SidebarSkate = ({ onClickOutside }:SidebarProps) => {
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
    <div className={s.skateContainer}>
    <div onClick={handleClick} className={isOpen1 ? s.open : ""}>
    <div
  className={`${s.sidebarItem} ${isOpen1 && isSelected ? s.selected : ""}`}
>
      Skate
      </div>
      {isOpen1 && (
        <div className={s.slide}>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <DecksButton />
          </div>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <ComplitesButton />
          </div>
          <div onClick={closeIfSiteHere} className={s.buttonContainer}>
          <TrucksButton />
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};
