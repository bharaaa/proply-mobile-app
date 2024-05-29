import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementRequestService from "../../service/ProcurementRequestService";
import UserService from "../../service/UserService";

const { getByEmail, getAll } = UserService()

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

export const getUsersAction = createAsyncThunk(
  "users",
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
      })
      .addCase(getUsersAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsersAction.fulfilled, (state, { payload }) => {
        state.users.push(payload.data);
        state.isLoading = false;
      })
      .addCase(getUsersAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default UserSlice
