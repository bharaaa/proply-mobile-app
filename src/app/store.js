import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './feature/AuthSlice';
import ProcurementListSlice from './feature/ProcurementListSlice';
import ProcurementRequestSlice from './feature/ProcurementRequestSlice';
import UserSlice from './feature/UserSlice';
import ProcurementCategorySlice from './feature/ProcurementCategorySlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    procurements: ProcurementListSlice.reducer,
    procurementsRequest: ProcurementRequestSlice.reducer,
    users: UserSlice.reducer,
    procurementCategory: ProcurementCategorySlice.reducer
  },
});

export default store;
