import { checkUser } from './authSlice';
import type { AppMiddleware, AppDispatch, RootState } from 'store/store.types';

let checkUserCalled = false;
import type { Action } from '@reduxjs/toolkit';

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
      store.dispatch(checkUser());
    }
  }

  return next(action);
};

export default authMiddleware;
