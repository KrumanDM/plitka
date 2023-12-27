import react, { useState } from "react";
import { Header } from "../Header";
import s from "./Busket.module.css";

export const Busket = () => {
  const [count, setCount] = useState(0);

  const countHandler = () => {
    setCount(prevCount => prevCount + 1);
  }

  return <>
  <Header/>
  <div className={s.busketContainer}>
    <h1>Busket</h1>
    {count}
    <button onClick={countHandler}>+1</button>
  </div>
  </>
};
