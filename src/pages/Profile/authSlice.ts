// features/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  isRegistered: boolean;
  isLogin: boolean;
  redirectToProfile: boolean;
  loginErrorMessage: string | null; // Изменено на string | null
  registrationErrorMessage: string | null; // Изменено на string | null
  successMessage: string; // Изменено на string
}

const initialState: AuthState = {
  isRegistered: false,
  isLogin: false,
  redirectToProfile: false,
  loginErrorMessage: null,
  registrationErrorMessage: null,
  successMessage: '',
};

// Async thunk для регистрации
export const registerUser  = createAsyncThunk(
  'auth/registerUser ',
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5001/api/users/register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }

    const data = await response.json();
    localStorage.setItem('userEmail', data.user.email);
    return data; // Возвращаем данные, включая сообщение
  }
);

// Async thunk для авторизации
export const loginUser  = createAsyncThunk(
  'auth/loginUser ',
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message); // Return error message
    }

    const data = await response.json();
    localStorage.setItem('userEmail', data.email);
    localStorage.setItem('userId', data.id);
    return data; // Return user data on successful login
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.loginErrorMessage = null; // Сброс сообщения об ошибке входа
      state.registrationErrorMessage = null; // Сброс сообщения об ошибке регистрации
    },
    checkUser (state) {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        state.isRegistered = true;
        state.isLogin = true;
        state.redirectToProfile = true;
      }
    },
    toggleLogin(state) {
      state.isLogin = !state.isLogin;
      state.loginErrorMessage = null; // Сброс сообщения об ошибке входа
      state.registrationErrorMessage = null; // Сброс сообщения об ошибке регистрации
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser .fulfilled, (state, action) => {
        state.isRegistered = true;
        state.isLogin = true; // Установите isLogin в true
        state.registrationErrorMessage = null; // Сброс сообщения об ошибке регистрации
        state.successMessage = action.payload.message; // Сохранение сообщения
      })
      .addCase(registerUser .rejected, (state, action) => {
        state.registrationErrorMessage = action.payload as string; // Сохранение сообщения об ошибке регистрации
        state.successMessage = ''; // Сброс сообщения об успехе
      })
      .addCase(loginUser .fulfilled, (state, action) => {
        state.isLogin = true; // Установите isLogin в true
        state.loginErrorMessage = null; // Сброс сообщения об ошибке входа
        state.successMessage = ''; // Сброс сообщения об успехе
      })
      .addCase(loginUser .rejected, (state, action) => {
        state.loginErrorMessage = action.payload as string; // Установите сообщение об ошибке входа
      });
  },
});

export const { resetError, checkUser , toggleLogin } = authSlice.actions;
export default authSlice.reducer;