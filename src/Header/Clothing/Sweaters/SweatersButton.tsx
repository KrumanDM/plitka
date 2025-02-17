import react from 'react';
import { Link } from 'react-router-dom';
import s from "./SweatersButton.module.css"

export const SweatersButton = () =>{
    return <div className={s.sweatersButtonContainer}>
    <button className={s.sweatersButton}>
        <Link to="/sweaters" className={s.sweatersLink}>Sweaters</Link>
    </button> 
  </div>
  } 