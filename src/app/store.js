import { configureStore } from '@reduxjs/toolkit'
import destionasReducer from '../features/destinations/destionationsSlice'
export const store = configureStore({
  reducer: {
    destionations: destionasReducer,
  },
})
