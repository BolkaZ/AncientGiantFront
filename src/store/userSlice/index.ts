import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../api';
import { UserList, UserLoginInput} from '../../api/Api.ts';

export type TUser = UserList

interface AuthState {
  isAuthenticated: boolean;
  user: TUser | null;
  loading: boolean;
  error: string | null;
}

export const userAuth = createAsyncThunk('user/auth', async (data: UserLoginInput)=>{
  const response = await api.login.userLogin(data, {withCredentials: true})
  if('data' in response){
    return response.data as TUser
  }
})

const getAuthDataFromLocalStorage = () => {
  const savedAuth = localStorage.getItem('auth_data');
  return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, user: { username: null, token: null, id: null } };
};

const setAuthDataToLocalStorage = (auth: AuthState) => {
  localStorage.setItem('auth_data', JSON.stringify(auth));
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
        if(action.payload) {
          state.user = action.payload;
        }
        state.loading = false;
        // saveAuthToLocalStorage(state);
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;