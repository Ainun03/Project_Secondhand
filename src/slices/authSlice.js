import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth/authService';

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }) => {
    try {
      const res = await authService.register({ username, email, password });
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const res = await authService.login({ email, password });
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {},
    register: {},
    error: "",
    loading: false
  },
  reducers: {
    logout: (state) => {
      state.login = {};
      state.register={};
    }
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.register = action.payload ? action.payload : {};
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.login = action.payload ? action.payload : {};
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

export const { logout } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;