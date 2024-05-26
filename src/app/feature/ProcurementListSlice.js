import AuthService from "../../service/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProcurementListService from "../../service/ProcurementListService";

const {getAll} = ProcurementListService()

export const getProcurementsAction = createAsyncThunk(
    "procurements",
    async () => {
        try {
            return await getAll()
        } catch (e) {
            const invalid = e.message.includes("403")
            const error = {
                error: true,
                message: invalid ? "Wrong email/password" : e.message
            }
        }
    }
)

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
    }
})

export const {selectedProcurement} = ProcurementListSlice.actions

export default ProcurementListSlice