import AuthService from "../../service/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementListService from "../../service/ProcurementListService";

const {getAll, approve} = ProcurementListService()

export const getProcurementsAction = createAsyncThunk(
    "procurements",
    async () => {
        try {
            return await getAll()
        } catch (e) {
            const invalid = e.message.includes("403")
            const error = {
                error: true,
            }
        }
    }
)

export const approveProcurementsAction = createAsyncThunk(
    'procurements/approve',
    async (procurementId, { rejectWithValue }) => {
      try {
        return await approve(procurementId);
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
);

const ProcurementListSlice = createSlice({
    name: "procurements",
    initialState: {
        isLoading: false,
        procurement: {},
        procurements: []
    },
    reducers: {
        selectedProcurement: (state, {payload}) => {
            state.procurement = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProcurementsAction.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getProcurementsAction.fulfilled, (state, {payload}) => {
            state.procurements = payload.data
            console.log("Fullfilled", state.procurements)
            state.isLoading = false
        });
        builder.addCase(getProcurementsAction.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(approveProcurementsAction.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(approveProcurementsAction.fulfilled, (state, action) => {
            state.isLoading = false
            const updatedProcurement = action.payload;
            state.procurements = state.procurements.map((procurement) =>
                procurement.id === updatedProcurement.procurementId ? { ...procurement, ...updatedProcurement } : procurement
            );
        });
        builder.addCase(approveProcurementsAction.rejected, (state) => {
            state.isLoading = false
        });
    }
})

export const {selectedProcurement} = ProcurementListSlice.actions

export default ProcurementListSlice