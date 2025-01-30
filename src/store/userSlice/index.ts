import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';
import { UserList, UserLoginInput, UserCreateInput, UserUpdateInput } from '../../api/Api.ts';
import Cookies from 'js-cookie';

export type TUser = UserList;

interface AuthState {
  isAuthenticated: boolean;
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

// Функция для авторизации пользователя
export const userAuth = createAsyncThunk('user/auth', async (data: UserLoginInput) => {
  const response = await api.login.userLogin(data);
  if ('data' in response) {

    const sessionid = response.headers['Set-Cookie']
  ?.find((cookie: string) => cookie.startsWith('sessionid='))
  ?.split(';')[0]
  ?.split('=')[1];

  console.log(sessionid);
    return response.data as TUser;
  }

  
  

  throw new Error('Failed to authenticate');
});

// Функция для выхода пользователя из системы
export const userLogout = createAsyncThunk('user/logout', async () => {
  try {
    await api.logout.userLogout({ withCredentials: true });
  } catch (error) {
    console.error('Logout failed:', error);
    throw error; // Выбросим ошибку, чтобы она была обработана в extraReducers
  }
});

// Функция для регистрации нового пользователя
export const userRegister = createAsyncThunk('user/register', async (data: UserCreateInput) => {
  try {
    const response = await api.users.userRegister(data);
    if ('data' in response) {
      return response.data as TUser;
    }
    throw new Error('Failed to register user');
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; // Выбросим ошибку, чтобы она была обработана в extraReducers
  }
});

// Функция для обновления данных пользователя
export const userUpdate = createAsyncThunk<TUser, { userId: string; data: UserUpdateInput }>(
  'user/update',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.users.userUpdate(userId, data, { withCredentials: true});
      if ('data' in response) {
        return response.data as TUser;
      }
      throw new Error('Failed to update user');
    } catch (error) {
      console.error('Update user failed:', error);
      return rejectWithValue(error.message || 'Failed to update user');
    }
  }
);

const getAuthDataFromLocalStorage = () => {
  const savedAuth = localStorage.getItem('auth_data');
  return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, user: null };
};

const setAuthDataToLocalStorage = (auth: AuthState) => {
  localStorage.setItem('auth_data', JSON.stringify({...auth, loading: false}));
};

const initialState: AuthState = getAuthDataFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; token: string; id: number }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      setAuthDataToLocalStorage(state); // Сохраняем в localStorage
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      setAuthDataToLocalStorage(state); // Сохраняем в localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(userAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userAuth.fulfilled, (state, action: PayloadAction<UserList | undefined>) => {
        state.isAuthenticated = true;
        if (action.payload) {
          state.user = action.payload;
          if(action.payload.session_id) {
            Cookies.set('session_id', action.payload.session_id, {domain: '127.0.0.1'});
          }
        }
        state.loading = false;
        setAuthDataToLocalStorage(state); // Сохраняем в localStorage после успешной авторизации
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Authentication failed';
      })
      // Logout
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        setAuthDataToLocalStorage(state); 
        Cookies.remove('session_id');
        // Очищаем данные в localStorage после успешного выхода
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      })
      // Register
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action: PayloadAction<TUser | undefined>) => {
        // state.isAuthenticated = true;
        // if (action.payload) {
        //   state.user = action.payload;
        // }
        state.loading = false;
        // setAuthDataToLocalStorage(state); // Сохраняем данные в localStorage после успешной регистрации
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Update User
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        setAuthDataToLocalStorage(state); // Обновляем данные в localStorage после успешного обновления
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Update failed';
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;