import react from 'react'; 
import s from './Footer.module.css'

export const Footer = () => {
  

    return <div className={s.footerContainer}>
        <h3 className={s.infoText}>Info:</h3>
        <a className={s.icon} href="https://www.instagram.com/plitka_dest.crew?igsh=MXA2cTd0ejdvdzFlaA==">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.8 2.00002H16.2C19.4032 2.00002 22 4.59677 22 7.80002V16.2C22 19.4033 19.4032 22 16.2 22H7.8C4.59675 22 2 19.4033 2 16.2V7.80002C2 4.59677 4.59675 2.00002 7.8 2.00002ZM7.6 4C5.61177 4 4 5.61178 4 7.6V16.4C4 18.3882 5.61177 20 7.6 20H16.4C18.3882 20 20 18.3882 20 16.4V7.6C20 5.61178 18.3882 4 16.4 4H7.6ZM17.25 5.5C17.9404 5.5 18.5 6.05965 18.5 6.75C18.5 7.44036 17.9404 8 17.25 8C16.5596 8 16 7.44036 16 6.75C16 6.05965 16.5596 5.5 17.25 5.5ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23857 17 7 14.7614 7 12C7 9.23858 9.23857 7 12 7ZM12 9C10.3431 9 9 10.3432 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3432 13.6569 9 12 9Z"
              fill="black"
            />
          </svg>
        </a>
        <a className={s.films} href={'https://youtu.be/BuxEPJ8bDXU?si=4CJHaZ_YzrBjw335'}>
        <h3>Films</h3>
        </a>
        <h3>Пн—Вс 10:00—21:00 </h3>
        
        <h3>Т. +375 (29) 715 55 40</h3>
        <div className={s.copyright}>Copyright © 2025 Plitka</div>
    </div>
}