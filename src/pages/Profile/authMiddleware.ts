import { Middleware, AnyAction } from '@reduxjs/toolkit';
import { checkUser      } from './authSlice';

let checkUserCalled = false;

const authMiddleware: Middleware = (store) => (next) => (action: any) => {
  const token = localStorage.getItem('userEmail');
  const state = store.getState();

  if (token && !state.auth.isLogin && action.type !== 'auth/checkUser' && !checkUserCalled) {
    checkUserCalled = true; // Prevent multiple dispatches
    store.dispatch(checkUser());
  }

  return next(action);
};
export default authMiddleware;

//Предотвращение бесконечной отправки: чтобы избежать рекурсивной отправки действий 
//(которая привела к ошибке «Превышен максимальный размер стека вызовов»), вводится флаг (checkUserCalled), 
//гарантирующий, что checkUser будет отправлен только один раз в течение жизненного цикла приложения, 
//пока не изменятся условия.

//Проверка аутентификации пользователя: промежуточное ПО проверяет, существует ли токен 
//(адрес электронной почты пользователя в локальном хранилище) и вошел ли пользователь в систему 
//(isLogin имеет значение false). Если пользователь не вошел в систему и действие checkUser не было запущено 
//(action.type !== 'auth/checkUser'), он отправляет действие checkUser для проверки сеанса пользователя.
