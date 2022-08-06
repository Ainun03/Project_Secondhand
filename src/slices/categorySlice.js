import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../services/category/categoryService';

export const categoryByName = createAsyncThunk(
  "category/getByName",
  async ({ token, name }) => {
    try {
      const res = await categoryService.getCategoryByName({ token, name });
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

// HERE, we need to add getAllCategories function

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: {},
    categories: [],
    error: "",
    loading: false
  },
  extraReducers: {
    [categoryByName.pending]: (state, action) => {
      state.loading = true;
    },
    [categoryByName.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload ? action.payload : {};
    },
    [categoryByName.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

const { reducer } = categorySlice;
export default reducer;