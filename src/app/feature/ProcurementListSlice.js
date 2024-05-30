import AuthService from "../../service/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementListService from "../../service/ProcurementListService";
import axiosInstance from "../../service/AxiosInstance";

const { getAll, approve, reject, cancel, getByUserId } = ProcurementListService();

export const getProcurementsAction = createAsyncThunk(
  "procurements",
  async () => {
    try {
      return await getAll();
    } catch (e) {
      const invalid = e.message.includes("403");
      const error = {
        error: true,
      };
    }
  }
);

export const approveProcurementsAction = createAsyncThunk(
  "procurements/approve",
  async ({ procurementId, procurementDetailId }, { rejectWithValue }) => {
    try {
      return await approve(procurementId, procurementDetailId);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const rejectProcurementsAction = createAsyncThunk(
  "procurements/reject",
  async ({ procurementId, procurementDetailId }, { rejectWithValue }) => {
    try {
      return await cancel(procurementId, procurementDetailId);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const cancelProcurementsAction = createAsyncThunk(
  "procurements/cancel",
  async ({ procurementId, procurementDetailId }, { rejectWithValue }) => {
    try {
      return await reject(procurementId, procurementDetailId);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getProcurementsByUserIdAction = createAsyncThunk(
  "procurements/fetchByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getByUserId(userId);
      if (response.statusCode === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || response.status);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const ProcurementListSlice = createSlice({
  name: "procurements",
  initialState: {
    isLoading: false,
    procurement: {},
    procurements: [],
  },
  reducers: {
    selectedProcurement: (state, { payload }) => {
      state.procurement = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProcurementsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProcurementsAction.fulfilled, (state, { payload }) => {
      state.procurements = payload.data;
      console.log("Fullfilled", state.procurements);
      state.isLoading = false;
    });
    builder.addCase(getProcurementsAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(approveProcurementsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(approveProcurementsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProcurement = action.payload;
      state.procurements = state.procurements.map((procurement) =>
        procurement.id === updatedProcurement.procurementId
          ? { ...procurement, ...updatedProcurement }
          : procurement
      );
    });
    builder.addCase(approveProcurementsAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(rejectProcurementsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(rejectProcurementsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProcurement = action.payload;
      state.procurements = state.procurements.map((procurement) =>
        procurement.id === updatedProcurement.procurementId
          ? { ...procurement, ...updatedProcurement }
          : procurement
      );
    });
    builder.addCase(rejectProcurementsAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(cancelProcurementsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelProcurementsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProcurement = action.payload;
      state.procurements = state.procurements.map((procurement) =>
        procurement.id === updatedProcurement.procurementId
          ? { ...procurement, ...updatedProcurement }
          : procurement
      );
    });
    builder.addCase(cancelProcurementsAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProcurementsByUserIdAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getProcurementsByUserIdAction.fulfilled,
      (state, { payload }) => {
        state.procurements = payload;
        console.log("Fullfilled (get by userid)", state.procurements);
        state.isLoading = false;
      }
    );
    builder.addCase(
      getProcurementsByUserIdAction.rejected,
      (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }
    );
  },
});

export const { selectedProcurement } = ProcurementListSlice.actions;

export default ProcurementListSlice;
