import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ItemCategoryService from "../../service/ItemCategoryService";

const { getAll } = ItemCategoryService()

export const getItemCategoryAction = createAsyncThunk(
  "item-categories",
  async () => {
    try {
      return await getAll();
    } catch (e) {
      const invalid = e.message.includes("403");
      const error = {
        error: true,
        message: invalid ? "Invalid item category" : e.message,
      };
    }
  }
);

const ItemCategorySlice = createSlice({
  name: "itemCategory",
  initialState: {
    isLoading: false,
    itemCategory: {},
    itemCategories: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItemCategoryAction.fulfilled, (state, { payload }) => {
        state.itemCategories.push(payload.data);
        state.isLoading = false;
      })
      .addCase(getItemCategoryAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ItemCategorySlice
