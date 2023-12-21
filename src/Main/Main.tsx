import react from "react";
import s from "./Main.module.css";

import { SearchItems } from "./SearchItems";

export const Main = () => {
  return (
    <div className={s.mainContainer}>
      <SearchItems />
    </div>
  );
};
