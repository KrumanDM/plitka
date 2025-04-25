import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import s from "../App.module.css";

import { PATH } from "./routes/paths";

// Import components directly
import Site from "../pages/Site/Site";
import Jackets from "../pages/Clothing/Jackets/Jackets";
import Hoodies from "../pages/Clothing/Hoodies/Hoodies";
import Socks from "../pages/Accessories/Socks/Socks";
import Hats from "../pages/Accessories/Hats/Hats";
import Bags from "../pages/Accessories/Bags/Bags";
import Trucks from "../pages/Skate/Trucks/Trucks";
import Profile from "../pages/Profile/Profile";
import Busket from "../pages/Busket/Busket";
import Sweaters from "../pages/Clothing/Sweaters/Sweaters";
import Decks from "../pages/Skate/Decks/Decks";
import CardPage from "../shared/components/ProductsComponents/CardPage";
import Complites from "../pages/Skate/Complites/Complites";
import UserProfile from "../pages/Profile/UserProfile/UserProfile";
import News from "../pages/News/News";
import NewsPage1 from "../pages/News/NewsPages/NewsPage1";


const App: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className={s.App}>
      <HashRouter>
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
          <Route path={PATH.NEWS} element={<News />} />
          <Route path={PATH.NEWSPAGES1 + "/:id"} element={<NewsPage1 />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;