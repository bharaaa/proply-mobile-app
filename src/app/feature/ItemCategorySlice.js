import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementRequestService from "../../service/ProcurementRequestService";
import UserService from "../../service/UserService";
import ProcurementCategoryService from "../../service/ProcurementCategoryService";
import ItemCategoryService from "../../service/ItemCategoryService";

const { getAll } = ItemCategoryService()

export const getItemCategoryAction = createAsyncThunk(
  "procurement-categories",
  async () => {
    try {
      return await getAll();
    } catch (e) {
      const invalid = e.message.includes("403");
      const error = {
        error: true,
        message: invalid ? "Wrong email/password" : e.message,
      };
    }
  }
);

const ItemCategorySlice = createSlice({
  name: "procurementCategory",
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
        state.procurementCategories.push(payload.data);
        state.isLoading = false;
      })
      .addCase(getItemCategoryAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ItemCategorySlice
