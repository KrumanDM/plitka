import react from 'react';
import { Link } from 'react-router-dom';
import s from "./ComplitesButton.module.css"

export const ComplitesButton = () =>{
    return <div className={s.complitesButtonContainer}>
    <button className={s.complitesButton}>
        <Link to="/complites" className={s.complitesLink}>Complites</Link>
    </button>
</div>
}