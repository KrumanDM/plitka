import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../../shared/components/Header/Header";
import s from "./SocksStorage.module.css";

 const SocksStorage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={s.sockMenu}>
        <h1 className={s.pageTitle}>Socks</h1>
        <div className={s.items}>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNPWHTQ_WHT_HERO?wid=800&hei=1004&fmt=jpeg&qlt=50&resMode=sharp2&op_usm=0.9,1.5,8,0"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VN000F0X_BLK_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
          <Link to="/Profile">
            <img
              className={s.item1}
              alt={""}
              src={
                "https://images.vans.com/is/image/Vans/VNNHU0O_HU0_HERO?$PLP-IMAGE$"
              }
            ></img>
          </Link>
        </div>
      </div>
    </>
  );
};
export default SocksStorage;