import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementRequestService from "../../service/ProcurementRequestService";
import UserService from "../../service/UserService";
import ProcurementCategoryService from "../../service/ProcurementCategoryService";

const { getAll } = ProcurementCategoryService();

export const getProcurementCategoryAction = createAsyncThunk(
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

const ProcurementCategorySlice = createSlice({
  name: "procurementCategory",
  initialState: {
    isLoading: false,
    procurementCategory: {},
    procurementCategories: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProcurementCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProcurementCategoryAction.fulfilled, (state, { payload }) => {
        state.procurementCategories.push(payload.data);
        state.isLoading = false;
      })
      .addCase(getProcurementCategoryAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ProcurementCategorySlice;
