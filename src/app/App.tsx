import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import s from "../App.module.css";

import { PATH } from "./routes/paths";
import { CircularProgress } from "@mui/material";



// Lazy load components
const Site = lazy(() => import("../shared/components/Site/Site"));
const JacketsStorage = lazy(() => import("../Header/Clothing/Jackets/JacketsStorage/JacketsStorage"));
const HoodiesStorage = lazy(() => import("../Header/Clothing/Hoodies/HoodiesStorage/HoodiesStorage"));
const SocksStorage = lazy(() => import("../Header/Accessories/Socks/SocksStorage/SocksStorage"));
const HatsStorage = lazy(() => import("../Header/Accessories/Hats/HatsStorage/HatsStorage"));
const Bags = lazy(() => import("../Header/Accessories/Bags/Bags"));
const Trucks = lazy(() => import("../shared/components/Trucks/Trucks"));
const Profile = lazy(() => import("../shared/components/Profile/Profile"));
const Busket = lazy(() => import("../shared/components/Busket/Busket"));
const Sweaters = lazy(() => import("../Header/Clothing/Sweaters/Sweaters"));
const Decks = lazy(() => import("../shared/components/Decks/Decks"));
const CardPage = lazy(() => import("../shared/components/ProductsComponents/CardPage"));
const Complites = lazy(() => import("../shared/components/Complites/Complites"));
const UserProfile = lazy(() => import("../shared/components/Profile/UserProfile/UserProfile"));

const App: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={s.App}>
   
      <HashRouter>
       
        <Suspense fallback={<CircularProgress size="30px" />}>
          <Routes>
            <Route path="/" element={<Navigate to={PATH.PLITKA} />} />
            <Route path={PATH.PLITKA} element={<Site />} />
            <Route path={PATH.JACKETS} element={<JacketsStorage />} />
            <Route path={PATH.SWEATERS} element={<Sweaters />} />
            <Route path={PATH.HOODIES} element={<HoodiesStorage />} />
            <Route path={PATH.BAGS} element={<Bags />} />
            <Route path={PATH.HATS} element={<HatsStorage />} />
            <Route path={PATH.SOCKS} element={<SocksStorage />} />
            <Route path={PATH.DECKS} element={<Decks />} />
            <Route path={PATH.COMPLITES} element={<Complites />} />
            <Route path={PATH.TRUCKS} element={<Trucks />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route path={PATH.USER_PROFILE} element={<UserProfile />} />
            <Route path={PATH.BUSKET} element={<Busket cartItems={cartItems} />} />
            <Route path={PATH.CARD} element={<CardPage cartItems={cartItems} />} />
          </Routes>
        </Suspense>
       
      </HashRouter>
    
    </div>
  );
};

export default App;
