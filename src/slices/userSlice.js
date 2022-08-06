import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/user/userService';

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ token }) => {
    try {
      return await (await userService.getUsers({ token })).data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    list: [],
    error: "",
    loading: false
  },
  reducers: {
    clearData: (state) => {
      state.list = [];
      state.data = {};
    },
    restData: (state, action) => {
      // state.data = (state.list.filter(item => item.userId == action.payload)[0]);
      state.data = action.payload ? action.payload : {};
    },
    fillData: (state, action) => {
      state.data = (state.list.filter(item => item.userId == action.payload)[0]);
    }
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload ? action.payload : [];
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

export const { clearData, fillData, restData } = userSlice.actions;

const { reducer } = userSlice;
export default reducer;