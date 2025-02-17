import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Footer } from "../../Footer/Footer";
import { AppDispatch, RootState } from "../../../store/store";
import { Header } from "../../../shared/components/Header/Header";
import { deleteOrder, getOrders } from "./orderSlice";
import s from "./UserProfile.module.css";

type OrderItem = {
  title: string;
  newPrice: string;
  img: string;
  company: string;
  color: string;
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
};

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders as Order[]);

  const [isOrderDeleted, setIsOrderDeleted] = useState(false); //Что бы срабатывал только при удалении заказа
  const [isModalOpenForOrder, setIsModalOpenForOrder] = useState<{ [key: string]: boolean }>({});

  const updateIsModalOpenForOrder = (orderId: string, isOpen: boolean) => {
    setIsModalOpenForOrder((prev) => ({ ...prev, [orderId]: isOpen }));
  };

  const isModalOpenForOrderId = (orderId: string) => isModalOpenForOrder[orderId];

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      dispatch(getOrders(userEmail));
    }
  }, [isOrderDeleted, dispatch]); //зависимость isOrderDeleted обновится если удалится товар и тогда перерисует обновлённые товары

  useEffect(() => {
    if (isOrderDeleted) {
      setIsOrderDeleted(false);
    }
  }, [isOrderDeleted]);

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
    setIsOrderDeleted(true);
  };

  const formatOrderId = (id: string) => id.slice(-5);

  return (
    <div>
      <Header />
      <h1 className={s.personalAccount}>Личный кабинет</h1>
      {orders.length === 0 ? (
        <div className={s.emptyOrdersContainer}>
          <h2>Вы еще не заказали ничего</h2>
          <p>Пожалуйста, сделайте заказ, чтобы увидеть его здесь</p>
        </div>
      ) : (
        orders.map((order: Order) => (
          <div key={order._id} className={s.userProfileContainer}>
            <h1 className={s.orderTitle}>Заказ №{formatOrderId(order._id)}</h1>
            {order.items.map((item: OrderItem) => (
              <div key={item.img} className={s.orderItem}>
                <img className={s.image} src={item.img}></img>
                <div className={s.orderItemTitle}>
                  <p>
                    Товар {order.items.indexOf(item) + 1}: {item.title}
                  </p>
                  <p>Цена: {item.newPrice}byn</p>
                  <p>Количество: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className={s.buttonContainer}>
              <b className={s.totalPrice}>
                Итоговая цена: {order.totalPrice}byn
              </b>
              <button className={s.button} onClick={() => updateIsModalOpenForOrder(order._id, true)}>
                Отменить заказ
              </button>
            </div>
            {isModalOpenForOrderId(order._id) && (
              <div className={s.modal}>
                <div className={s.modalContent}>
                  <h2>Вы дейсивительно хотите отменить заказ?</h2>

                  <div className={s.modalButtons}>
                    <button
                      onClick={() => {
                        handleDeleteOrder(order._id);
                        updateIsModalOpenForOrder(order._id, false);
                      }}
                    >
                      Отменить заказ
                    </button>
                    <button type="button" onClick={() => updateIsModalOpenForOrder(order._id, false)}>
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;