import react from 'react';
import { Link } from 'react-router-dom';
import s from "./DecksButton.module.css"

export const DecksButton = () =>{
    return <div className={s.decksButtonContainer}>
    <button className={s.decksButton}>
        <Link to="/decks" className={s.decksLink}>Decks</Link>
    </button>
</div>
}