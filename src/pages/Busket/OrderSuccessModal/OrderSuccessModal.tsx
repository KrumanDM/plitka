import React from 'react';
import s from './OrderSuccessModal.module.css';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <h2>Заказ оформлен!</h2>
        <p>Вам перезвонит наш менеджер в течение 5 минут.</p>
        <button type="button" className={s.button} onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;