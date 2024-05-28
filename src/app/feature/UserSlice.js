import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementRequestService from "../../service/ProcurementRequestService";
import UserService from "../../service/UserService";

const { getByEmail } = UserService()

export const getByEmailAction = createAsyncThunk(
  "users/email",
  async (requestBody, { rejectWithValue }) => {
    try {
      return await getByEmail(requestBody);
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    user: {},
    users: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getByEmailAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getByEmailAction.fulfilled, (state, { payload }) => {
        state.users.push(payload.data);
        state.isLoading = false;
      })
      .addCase(getByEmailAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default UserSlice
