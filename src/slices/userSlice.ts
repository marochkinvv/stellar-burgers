import { TUser } from '@utils-types';
import {
  getUserApi,
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  TLoginData
} from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../utils/cookie';

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const getUser = createAsyncThunk('user/get', getUserApi);
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export interface IUserState {
  isAuth: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: IUserState = {
  isAuth: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message as string;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      });
    builder
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      });
  },
  selectors: {
    isAuthSelector: (state) => state.isAuth,
    getUserSelector: (state) => state.user,
    updateUserSelector: (state) => state.user,
    loginUserSelector: (state) => state.user,
    errorUser: (state) => state.error
  }
});

export const {
  isAuthSelector,
  getUserSelector,
  updateUserSelector,
  loginUserSelector,
  errorUser
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
