import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser, User } from '../models/LoginUser';

import authService from '../services/Authenticate.service';
import { RootState } from '../Store';

const storedUser: string | null = localStorage.getItem('user');
const user: User | null = !!storedUser ? JSON.parse(storedUser) : null;

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: User | null;
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  user: user,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};


export const login = createAsyncThunk(
  'auth/login',
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to login');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});


export const authenticateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload.isAuthenticate;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

export const { reset } = authenticateSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};

export default authenticateSlice.reducer;