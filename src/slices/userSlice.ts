import { TUser } from '@utils-types';
import {
  getUserApi,
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  resetPasswordApi
} from '../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../utils/cookie';

export const registerUser = createAsyncThunk('user/register', registerUserApi);

export const getUser = createAsyncThunk('user/get', getUserApi);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  resetPasswordApi
);

export interface IUserState {
  isAuth: boolean;
  isLoading: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: IUserState = {
  isAuth: false,
  user: {
    email: '',
    name: ''
  },
  isLoading: false,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuth = false;
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.user = action.payload.user;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.error = undefined;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = {
          email: '',
          name: ''
        };
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.error = undefined;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message as string;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = {
          email: '',
          name: ''
        };
      });
  },
  selectors: {
    isAuthSelector: (state) => state.isAuth,
    getUserSelector: (state) => state.user,
    updateUserSelector: (state) => state.user,
    loginUserSelector: (state) => state.user,
    errorUser: (state) => state.error,
    isLoadingSelector: (state) => state.isLoading,
    resetPasswordSelector: (state) => state.user
  }
});

export const {
  isAuthSelector,
  getUserSelector,
  updateUserSelector,
  loginUserSelector,
  errorUser,
  isLoadingSelector,
  resetPasswordSelector
} = userSlice.selectors;

export const userReducer = userSlice.reducer;
