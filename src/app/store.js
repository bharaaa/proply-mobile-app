import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './feature/AuthSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer
  },
});

export default store;
