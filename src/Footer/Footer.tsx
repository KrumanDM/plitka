import react from 'react'; 
import s from './Footer.module.css'

export const Footer = () => {
    return <div className={s.footerContainer}>
        <h2>Info</h2>
        <a href={'https://youtu.be/BuxEPJ8bDXU?si=4CJHaZ_YzrBjw335'}>
        <h1>Films</h1>
        </a>
        <h2>Пн—Вс 12:00—21:00 <br/>Т. +375 (29) 715 55 40</h2>
        <h2>Copyright © 2023 Plitka</h2>
    </div>
}