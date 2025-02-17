import { BsFillBagFill } from "react-icons/bs";
import react, { FC } from "react";

type CardsPropsType = {
  img: string,
  title: string,
  star: JSX.Element,
  reviews: string,
  prevPrice: string,
  newPrice: string,
}

const Card: FC<CardsPropsType> = ({img, title, star, reviews, prevPrice, newPrice }) => {
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">
              <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
