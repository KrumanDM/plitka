 import "../../../Header/Skate/Decks/DecksStorage/Recommended/Recommended"
 import react, { FC } from "react";
 import s from "./Button.module.css"

 type ButtonPropsType = {
  onClickHandler: () => void,
  value: string,
  title: string,
 }

 const Button:  FC<ButtonPropsType> = ({ onClickHandler, value, title }) => {
  return (
    <button onClick={onClickHandler} value={value} className={s.button}>
      {title}
    </button>
  );
};

export default Button;
