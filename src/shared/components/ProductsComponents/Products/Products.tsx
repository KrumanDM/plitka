import { FC } from "react";
import s from "./Product.module.css"

type ResultType = JSX.Element[];

type PropsType = {
  result: ResultType;
  
};

const Products: FC<PropsType> = (props) => {
  return (
    <>
      <section className={s.cardContainer}>{props.result}</section>
    </>
  );
};

export default Products;
