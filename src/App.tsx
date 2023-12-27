import React from "react";
import s from "./App.module.css";

import { Container } from "@mui/material";

import { Site } from "./Site/Site";
import { SweatersStorage } from "./Header/Clothing/Sweaters/SweatersStorage/SweatersStorage";
import { JacketsStorage } from "./Header/Clothing/Jackets/JacketsStorage/JacketsStorage";
import { HoodiesStorage } from "./Header/Clothing/Hoodies/HoodiesStorage/HoodiesStorage";
import { SocksStorage } from "./Header/Accessories/Socks/SocksStorage/SocksStorage";
import { HatsStorage } from "./Header/Accessories/Hats/HatsStorage/HatsStorage";
import { BagsStorage } from "./Header/Accessories/Bags/BagsStorage/BagsStorage";
import { DecksStorage } from "./Header/Skate/Decks/DecksStorage/DecksStorage";
import { ComplitesStorage } from "./Header/Skate/Complites/ComplitesStorage/ComplitesStorage";
import { TrucksStorage } from "./Header/Skate/Trucks/TrucksStorage/TrucksStorage";
import { Profile } from "./Header/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Busket } from "./Header/Bucket/Busket";


console.log("hi");

function App() {
  return (
    <div className={s.App}>

      <BrowserRouter>
        <Routes>
          {/* Убираем exact */}
          <Route path="/plitka" element={<Site />} />
          <Route path="/jackets" element={<JacketsStorage />} />
          <Route path="/sweaters" element={<SweatersStorage />} />
          <Route path="/hoodies" element={<HoodiesStorage />} />

          <Route path="/bags" element={<BagsStorage />} />
          <Route path="/hats" element={<HatsStorage />} />
          <Route path="/socks" element={<SocksStorage />} />

          <Route path="/decks" element={<DecksStorage />} />
          <Route path="/complites" element={<ComplitesStorage />} />
          <Route path="/trucks" element={<TrucksStorage />} />

          <Route path="/profile" element={<Profile />}/>
          <Route path="/busket" element={<Busket/>}/>

        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
