import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import s from "./CardPage.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import Button from "../Button/Button";
import { Item } from "shared/config/types";

// Define the props interface
type CardPageProps = {
  cartItems: Item[]; // Add cartItems to the props interface
}

const CardPage: React.FC<CardPageProps> = ({ cartItems }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openedImg, setOpenedImg] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleOpenImg = (img: string) => {
    setOpenedImg(img);
  };

  const handleCloseImg = () => {
    setOpenedImg(null);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel(zoomLevel - 0.1);
  };

  const { title, newPrice, img, company, color, size, prevPrice } = useParams<{
    title: string;
    newPrice: string;
    img: string;
    company: string;
    color: string;
    size: string;
    prevPrice?: string;
  }>();

  // Validate parameters
  if (!title || !newPrice || !img || !company || !color || !size) {
    return <div>Error: Missing product details.</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      title,
      newPrice,
      img,
      company,
      color,
      size,
      prevPrice: prevPrice || "", // Default to empty string if prevPrice is not provided
    }));
    setIsModalOpen(true);
  };
  
  return (
    <>
      <Header />
      <div className={s.mainContainer}>
        <div className={s.imageContainer}>
          <div className={s.image}>
          <img
            src={decodeURIComponent(img)}
            alt={title}
            onClick={() => handleOpenImg(decodeURIComponent(img))}
          />
          </div>
        </div>
        <div className={s.descriptionContainer}>
          <h1>{title}</h1>
          <div className={s.descriptionMini}>
            <p>Цена: {newPrice}byn</p>
            <p>Бренд: {company}</p>
            <p>Цвет: {color}</p>
            <p>Размер: {size}</p>
          </div>
          <Button onClick={handleAddToCart}>Добавить в корзину</Button>
        </div>
      </div>
      {openedImg && (
        <div className={s.openedImg} onClick={handleCloseImg}>
          <img src={openedImg} alt={title} />
        </div>
      )}
      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2>Товар добавлен в корзину!</h2>
      
              <Button
               onClick={() => setIsModalOpen(false)}>Закрыть</Button>
            
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CardPage;
