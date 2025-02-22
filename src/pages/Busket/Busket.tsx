import React, { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Header } from "../../shared/components/Header/Header";
import s from "./Busket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  clearCart,
  incrementItem,
  decrementItem,
  calculateTotalPrice,
  placeOrder,
  OrderData,
  setCart,
} from "../../store/cartSlice";
import { Item } from "../../shared/config/types";
import OrderSuccessModal from "./OrderSuccessModal/OrderSuccessModal";

type BusketPropsType = {
  cartItems: Item[];
};
 type ItemPropsType = {
  color:string;
company:string;
img:string;
newPrice:string;
prevPrice:string;
quantity:number;
size:string;
title:string;
totalPrice:number;
}

const Busket: FC<BusketPropsType> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const generalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cartItems, dispatch]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const cart = JSON.parse(cartData);
      dispatch(setCart(cart));
    }
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePlusOne = (item: Item) => {
    dispatch(incrementItem(item.title));
  };

  const handleMinusOne = (item: Item) => {
    dispatch(decrementItem(item.title));
  };

  const handleOrder = async () => {
    if (name === "" || phone === "") {
      if (name === "") {
        setNameError(true);
      } else {
        setNameError(false);
      }
      if (phone === "") {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      return;
    }

    const userEmail = localStorage.getItem("userEmail");
    const orderData = {
      items: cartItems,
      totalPrice: generalPrice,
      userEmail: userEmail,
      name: name,
      phone: phone,
    };

    try {
      const response = await dispatch(placeOrder(orderData)).unwrap();
      setIsOrderSuccessModalOpen(true);
      handleClearCart();
      setIsModalOpen(false); // Закрываем модальное окно после успешного оформления заказа
      localStorage.removeItem("cart"); // Удаляем данные из localStorage
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при оформлении заказа.");
    }
  };
  console.log(cartItems)
  return (
    <>
      <Header />
      {isMobile ? (
        <div className={s.busketContainer}>
          <h1>Корзина</h1>
          <div>
            
            {cartItems.map((item: ItemPropsType, index: number) => (
              <div className={`${s.products} ${s.itemBorder}`} key={`${item.title}-${item.newPrice}-${item.img}`}>
                <div className={s.tovar1}>
                  <img className={s.tovar} src={item.img} alt={item.title} />
                </div>
                <div className={s.titleAndCountMobile}>
                  <div className={s.titleDeck}>{item.title}</div>
                  <div className={s.countButtonsMobile}>
                    <button
                      type="button"
                      className={s.buttonPlusMinus}
                      onClick={() => handleMinusOne(item)}
                    >
                      -
                    </button>
                    <h2 className={s.quantity}>{item.quantity}</h2>
                    <button
                      type="button"
                      className={s.buttonPlusMinus}
                      onClick={() => handlePlusOne(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={s.itogo}>{item.totalPrice}byn</div>
              </div>
            ))}
          </div>
          <div className={s.generalPriceAndButtonsMobile}>
            <div className={s.generalPriceMobile}>
              Cумма товаров: <b>{generalPrice}byn</b>
            </div>
            <div className={s.buttonsContainerMobile}>
              <button type="button" className={s.button} onClick={handleClearCart}>
                Очистить корзину
              </button>
              <button
                type="button"
                className={
                  cartItems.length > 0
                    ? s.button
                    : `${s.button} ${s.disabledButton}`
                }
                onClick={() => setIsModalOpen(true)}
                disabled={cartItems.length === 0}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.busketContainer}>
          <h1>Корзина</h1>
          <div className={s.busketDescription}>
            <div className={s.tovar}>Товар</div>
            <div className={s.threeDescription}>
              <div className={s.cena}>Цена</div>
              <div className={s.colvo}>Количество</div>
              <div className={s.itogo}>Итого</div>
            </div>
          </div>
          <div>
            {cartItems.map((item: ItemPropsType, index: number) => (
              <div className={`${s.products} ${s.itemBorder}`} key={index}>
                <div className={s.tovar1}>
                  <img className={s.tovar} src={item.img} alt={item.title} />
                  <div className={s.titleDeck}>{item.title}</div>
                </div>
                <div className={s.threeDescription}>
                  <div className={s.cena}>{item.newPrice}byn</div>
                  <div className={s.colvo}>
                    <button
                      type="button"
                      className={s.buttonPlusMinus}
                      onClick={() => handleMinusOne(item)}
                    >
                      -
                    </button>
                    <h2 className={s.quantity}>{item.quantity}</h2>
                    <button
                      type="button"
                      className={s.buttonPlusMinus}
                      onClick={() => handlePlusOne(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className={s.itogo}>{item.totalPrice}byn</div>
                </div>
              </div>
            ))}
          </div>
          <div className={s.generalPriceAndButtons}>
            <div className={s.generalPrice}>
              Cумма товаров: <b>{generalPrice}byn</b>
            </div>
            <div className={s.buttonsContainer}>
              <button type="button" className={s.button} onClick={handleClearCart}>
                Очистить корзину
              </button>
              <button
                type="button"
                className={
                  cartItems.length > 0
                    ? s.button
                    : `${s.button} ${s.disabledButton}`
                }
                onClick={() => setIsModalOpen(true)}
                disabled={cartItems.length === 0}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalContent}>
            <h2>Оформить заказ</h2>
            <label>
              Имя:
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value === "") {
                    setNameError(true);
                  } else {
                    setNameError(false);
                  }
                }}
              />
              {nameError && (
                <span style={{ color: "red" }}>Поле не заполнено</span>
              )}
            </label>
            <label>
              Номер телефона:
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/[^0-9+()-]/g, "");
                  setPhone(onlyNumbers);
                  if (onlyNumbers === "") {
                    setPhoneError(true);
                  } else {
                    setPhoneError(false);
                  }
                }}
              />
              {phoneError && (
                <span style={{ color: "red" }}>Поле не заполнено</span>
              )}
            </label>
            <div className={s.modalButtons}>
              <button
                type="button"
                onClick={handleOrder}
                disabled={nameError || phoneError}
                className={
                  nameError || phoneError
                    ? `${s.button} ${s.disabledButton}`
                    : s.button
                }
              >
                Отправить
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
      {isOrderSuccessModalOpen && (
      <OrderSuccessModal
        isOpen={isOrderSuccessModalOpen}
        onClose={() => setIsOrderSuccessModalOpen(false)}
      />
    )}
    </>
  );
};
export default Busket;