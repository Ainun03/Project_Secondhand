import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/product/productService";
import axios from 'axios';

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      return await (await productService.getAllProduct()).data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const productBySellerId = createAsyncThunk(
  "product/getBySellerId",
  async ({ token, id }) => {
    try {
      return await (await productService.getProductBySellerId({ token, id })).data.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const productByName = createAsyncThunk(
  "product/getByName",
  async ({ token, name }) => {
    try {
      return await (await productService.getProductByName({ token, name })).data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "/product/createProduct",
  async ({ userId, image, categoryId, productName, productStatus, price, description },) => {
    console.log(image)
    const url = `https://binar-secondhand-production.herokuapp.com/product/add-product`;
    try {
      const res = await axios.post(url,
        { userId, image, categoryId, productName, productStatus, price, description },
        {
          headers: {
            "accept": "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/product/updateProduct",
  async ({ token, productId, image, categoryId, productName, price, description },) => {
    const url = `https://binar-secondhand-production.herokuapp.com/product/update-product`;
    try {
      const res = await axios.put(url,
        { productId, image, categoryId, productName, price, description },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "accept": "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    productBySeller: [],
    products: [],
    create: {},
    error: "",
    loading: false
  },
  reducers:{
    clearData: (state) => {
      state.list = [];
      state.data = {};
    },
    setPreview:(state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: {
    [getAllProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.create = action.payload ? action.payload : {};
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },

    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.productBySeller = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //   [createProduct.fulfilled]: (state, action) => {
    //     state.push(action.payload);
    //   },
    //   [retrieveTutorials.fulfilled]: (state, action) => {
    //     return [...action.payload];
    //   },
    //   [updateTutorial.fulfilled]: (state, action) => {
    //     const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
    //     state[index] = {
    //       ...state[index],
    //       ...action.payload,
    //     };
    //   },
    //   [deleteTutorial.fulfilled]: (state, action) => {
    //     let index = state.findIndex(({ id }) => id === action.payload.id);
    //     state.splice(index, 1);
    //   },
    //   [deleteAllTutorials.fulfilled]: (state, action) => {
    //     return [];
    //   },
    //   [findTutorialsByTitle.fulfilled]: (state, action) => {
    //     return [...action.payload];
    //   },
    [productBySellerId.pending]: (state, action) => {
      state.loading = true;
    },
    [productBySellerId.fulfilled]: (state, action) => {
      state.loading = false;
      state.productBySeller = action.payload;
    },
    [productBySellerId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  },
});

export const {clearData, setPreview } = productSlice.actions;
export default productSlice.reducer;