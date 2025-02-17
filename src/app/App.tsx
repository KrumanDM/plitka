import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import s from "../App.module.css";

import { PATH } from "./routes/paths";
import { CircularProgress } from "@mui/material";



// Lazy load components
const Site = lazy(() => import("../pages/Site/Site"));
const Jackets = lazy(() => import("../pages/Clothing/Jackets/Jackets"));
const Hoodies = lazy(() => import("../pages/Clothing/Hoodies/Hoodies"));
const Socks = lazy(() => import("../pages/Accessories/Socks/Socks"));
const Hats = lazy(() => import("../pages/Accessories/Hats/Hats"));
const Bags = lazy(() => import("../pages/Accessories/Bags/Bags"));
const Trucks = lazy(() => import("../pages/Skate/Trucks/Trucks"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Busket = lazy(() => import("../pages/Busket/Busket"));
const Sweaters = lazy(() => import("../pages/Clothing/Sweaters/Sweaters"));
const Decks = lazy(() => import("../pages/Skate/Decks/Decks"));
const CardPage = lazy(() => import("../shared/components/ProductsComponents/CardPage"));
const Complites = lazy(() => import("../pages/Skate/Complites/Complites"));
const UserProfile = lazy(() => import("../pages/Profile/UserProfile/UserProfile"));

const App: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={s.App}>
   
      <HashRouter>
       
        <Suspense fallback={<CircularProgress size="30px" />}>
          <Routes>
            <Route path="/" element={<Navigate to={PATH.PLITKA} />} />
            <Route path={PATH.PLITKA} element={<Site />} />
            <Route path={PATH.JACKETS} element={<Jackets />} />
            <Route path={PATH.SWEATERS} element={<Sweaters />} />
            <Route path={PATH.HOODIES} element={<Hoodies />} />
            <Route path={PATH.BAGS} element={<Bags />} />
            <Route path={PATH.HATS} element={<Hats />} />
            <Route path={PATH.SOCKS} element={<Socks />} />
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
