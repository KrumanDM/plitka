
import { ChangeEvent, FC } from "react";
import s from "./Nav.module.css"

type NavPropsType = {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
  query: string,
};


const Nav: FC<NavPropsType> = ({ handleInputChange, query }) => {
  return (
    <div className={s.nav}>
      <div className={s.navContainer}>
        <input
          className={s.searchInput}
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Поиск"
        />
      </div>
      
    </div>
  );
};

export default Nav;
