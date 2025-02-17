import { BsFillBagFill } from "react-icons/bs";
import react, { FC } from "react";
import s from "./CardSearch.module.css"
import { Link } from "react-router-dom";

type CardsPropsType = {
  img: string,
  title: string,
  star: string,
  reviews: string,
  prevPrice: string,
  newPrice: string,
  size: string,
  company:string,
  color:string,
}

const Card: FC<CardsPropsType> = ({ img, title, prevPrice, newPrice, company, color, size}) => {
  return (<>
    <Link to={`/card/${title}/${newPrice}/${encodeURIComponent(img)}/${company}/${color}/${size}`}>


  <section className={s.card}>
  <img src={img} alt={title} style={{ height: '100%', width: 'auto' }} />
        <div className={s.cardDetails}>
          <h3 className={s.cardTitle}>{title}</h3>
          
          <section className={s.cardPrice}>
            <div className={s.price}>
              <del>{prevPrice}</del> {newPrice}byn
            </div>
           
          </section>
        </div>
      </section>
      </Link>
    </>
  );
};

export default Card;
