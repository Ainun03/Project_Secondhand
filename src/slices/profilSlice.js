import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateInfoProfil = createAsyncThunk(
  "/users/updateInfoProfil",
  async ({ userId, username, email, city, address, phoneNumber, image }) => {
    const url = `https://binar-secondhand-production.herokuapp.com/users/update-user`;
    try {
      const res = await axios.put(url,
        { userId, username, email, city, address, phoneNumber, image },
        {
          headers: {
            "accept": "*/*",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return (res.data);

    } catch (error) {
      console.error(error.message);
    }
  }
);

const profilSlice = createSlice({
  name: "users",
  initialState
    : {
    data: {},
    error: '',
    loading: false,
  },
  extraReducers: {
    [updateInfoProfil.pending]: (state) => {
      state.loading = true;
    },
    [updateInfoProfil.fulfilled]: (state, action) => {
      state.loading = false;
      // state.data = action.payload;
      state.data = action.payload ? action.payload : {};
    },

    [updateInfoProfil.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

  },
});
const { reducer } = profilSlice;
export default reducer;
