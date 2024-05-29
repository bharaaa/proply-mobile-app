import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './feature/AuthSlice';
import ProcurementListSlice from './feature/ProcurementListSlice';
import ProcurementRequestSlice from './feature/ProcurementRequestSlice';
import UserSlice from './feature/UserSlice';
import ProcurementCategorySlice from './feature/ProcurementCategorySlice';
import ItemCategorySlice from './feature/ItemCategorySlice';
import ItemNameSlice from './feature/ItemNameSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    procurements: ProcurementListSlice.reducer,
    procurementsRequest: ProcurementRequestSlice.reducer,
    users: UserSlice.reducer,
    procurementCategory: ProcurementCategorySlice.reducer,
    itemCategory: ItemCategorySlice.reducer,
    itemName: ItemNameSlice.reducer
  },
});

export default store;
