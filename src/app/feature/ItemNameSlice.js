import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemNameService from "../../service/ItemNameService";

const { getAll } = ItemNameService()

export const getItemNameAction = createAsyncThunk(
  "items",
  async () => {
    try {
      return await getAll();
    } catch (e) {
      const invalid = e.message.includes("403");
      const error = {
        error: true,
        message: invalid ? "Invalid Item Name" : e.message,
      };
    }
  }
);

const ItemNameSlice = createSlice({
  name: "itemName",
  initialState: {
    isLoading: false,
    itemName: {},
    itemNames: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemNameAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItemNameAction.fulfilled, (state, { payload }) => {
        state.itemNames.push(payload.data);
        state.isLoading = false;
      })
      .addCase(getItemNameAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ItemNameSlice
