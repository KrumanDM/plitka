import React, { useState } from "react";
import s from "./Sidebar.module.css";
import closeIcon from "./closeOutline.svg";
import { SidebarAccessories } from "./SidebarAccessories/SidebarAccessories";
import { SidebarClothing } from "./SidebarClothing/SidebarClothing";
import { SidebarSkate } from "./SidebarSkate/SidebarSkate";

type SidebarProps = {
  onClickOutside: () => void;
};

export const Sidebar = ({ onClickOutside }: SidebarProps) => {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleClick = (component: string) => {
    if (selectedComponent === component) {
      onClickOutside();
    } else {
      setSelectedComponent(component);
    }
  };

  const closeIfSiteHere = () => {
    if (selectedComponent) {
      onClickOutside();
    }
  };

  const handleComponentClick = (component: string) => {
    handleClick(component);
  };

  return (
    <div className={s.sidebar1}>
      <div className={s.borderUnderClose}></div>
      <div className={s.storeContainer1}>
        <div className={s.sidebarContent}>
          <SidebarClothing onClickOutside={onClickOutside} />

          <SidebarAccessories onClickOutside={onClickOutside} />

          <SidebarSkate onClickOutside={onClickOutside} />
        </div>
        <img
          className={s.closeButton}
          onClick={onClickOutside}
          src={closeIcon}
          alt="close sidebar"
          id={"hw5-menu-close"}
        />
      </div>
    </div>
  );
};
