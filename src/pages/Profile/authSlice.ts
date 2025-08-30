import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface AuthState {
  isRegistered: boolean;
  isLogin: boolean;
  redirectToProfile: boolean;
  loginErrorMessage: string | null;
  registrationErrorMessage: string | null;
  successMessage: string;
  user: { id: string; email: string } | null;
}

const initialState: AuthState = {
  isRegistered: false,
  isLogin: false,
  redirectToProfile: false,
  loginErrorMessage: null,
  registrationErrorMessage: null,
  successMessage: '',
  user: null,
};

// Регистрация
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5001/api/users/register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  }
);

// Логин
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  }
);

// Проверка токена
export const checkUser = createAsyncThunk(
  'auth/checkUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token');

    const response = await fetch('http://localhost:5001/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      return rejectWithValue('Invalid token');
    }

    return await response.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.loginErrorMessage = null;
      state.registrationErrorMessage = null;
    },
    logout(state) {
      localStorage.removeItem('token');
      state.isLogin = false;
      state.user = null;
      state.redirectToProfile = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegistered = true;
        state.isLogin = true;
        state.registrationErrorMessage = null;
        state.successMessage = 'Регистрация успешна';
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationErrorMessage = action.payload as string;
        state.successMessage = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLogin = true;
        state.loginErrorMessage = null;
        state.successMessage = '';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginErrorMessage = action.payload as string;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload;
        state.redirectToProfile = true;
      })
      .addCase(checkUser.rejected, (state) => {
        state.isLogin = false;
        state.user = null;
      });
  },
});

export const { resetError, logout } = authSlice.actions;
export default authSlice.reducer;
