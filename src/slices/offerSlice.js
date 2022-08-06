import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import offerService from '../services/offer/offerService';
import axios from "axios";

export const addOffer = createAsyncThunk(
  "/offer/addOffer",
  async ({ token, username, productId, offerPrice }) => {
    console.log(token, username, productId ,offerPrice)
    const url = `https://binar-secondhand-production.herokuapp.com/offer/add-offer`;
    try {
      const res = await axios.post(url,
        { username, productId, offerPrice },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // "accept": "*/*",
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

export const getOfferBySeller = createAsyncThunk(
  'offer/getOfferBySeller',
  async (id) => {
    try {
      return await (await offerService.getOfferBySeller(id)).data;
    } catch (error) {
      console.error(error.message);
    }
  }
);

const offerSlice = createSlice({
  name: 'offer',
  initialState: {
    dataOffer: {},
    offers: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [addOffer.pending]: (state) => {
      state.loading = true;
    },
    [addOffer.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataOffer = action.payload ? action.payload : {};
    },
    [addOffer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getOfferBySeller.pending]: (state, action) => {
      state.loading = true;
    },
    [getOfferBySeller.fulfilled]: (state, action) => {
      state.loading = false;
      state.offers = action.payload;
    },
    [getOfferBySeller.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
});

export default offerSlice.reducer;