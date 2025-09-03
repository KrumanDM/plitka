// authMiddleware.ts
import { checkUser } from './authSlice';
import type { AppMiddleware } from 'store/store.types';
import type { Action } from '@reduxjs/toolkit';

let checkUserCalled = false;

function isReduxAction(action: unknown): action is Action {
  return typeof action === 'object' && action !== null && 'type' in action;
}

const authMiddleware: AppMiddleware = (store) => (next) => (action) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const state = store.getState();

  if (isReduxAction(action)) {
    if (action.type === 'auth/logout') {
      checkUserCalled = false;
    }

    if (
      token &&
      !state.auth.isLogin &&
      action.type !== 'auth/checkUser' &&
      !checkUserCalled
    ) {
      checkUserCalled = true;
      // ✅ Теперь dispatch принимает thunk без ошибок
      store.dispatch(checkUser());
    }
  }

  return next(action);
};

export default authMiddleware;
