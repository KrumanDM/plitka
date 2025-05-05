import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Footer } from "../../Footer/Footer";
import { AppDispatch, RootState } from "../../../store/store";
import { Header } from "../../../shared/components/Header/Header";
import { deleteOrder, getOrders } from "./orderSlice";
import s from "./UserProfile.module.css";
import Button from "../../../shared/components/Button/Button";
import { Alert, Snackbar } from "@mui/material";

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
  const orders = useSelector(
    (state: RootState) => state.orders.orders as Order[]
  );

  const [isOrderDeleted, setIsOrderDeleted] = useState(false); //Что бы срабатывал только при удалении заказа
  const [isModalOpenForOrder, setIsModalOpenForOrder] = useState<{
    [key: string]: boolean;
  }>({});

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const updateIsModalOpenForOrder = (orderId: string, isOpen: boolean) => {
    setIsModalOpenForOrder((prev) => ({ ...prev, [orderId]: isOpen }));
  };

  const isModalOpenForOrderId = (orderId: string) =>
    isModalOpenForOrder[orderId];

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
    setOpenSnackbar(true);
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
              <Button
                onClick={() => updateIsModalOpenForOrder(order._id, true)}
                style={{ width: "30%", padding: "8px" }}
              >
                Отменить заказ
              </Button>
            </div>
            {isModalOpenForOrderId(order._id) && (
              <div className={s.modal}>
                <div className={s.modalContent}>
                  <h2>Вы дейсивительно хотите отменить заказ?</h2>

                  <div className={s.modalButtons}>
                    <Button
                      onClick={() => {
                        handleDeleteOrder(order._id);
                        updateIsModalOpenForOrder(order._id, false);
                      }}
                      style={{ width: "45%", padding: "0px" }}
                    >
                      Отменить заказ
                    </Button>
                    <Button
                      type="button"
                      onClick={() =>
                        updateIsModalOpenForOrder(order._id, false)
                      }
                      style={{ width: "45%", padding: "0px" }}
                    >
                      Закрыть
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#405cf5" }}
        >
          Заказ успешно удален!
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
};

export default UserProfile;

