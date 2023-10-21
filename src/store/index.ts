import  {configureStore} from '@reduxjs/toolkit';
import templateReducer from './reducers/templateReducer';

export const store = configureStore({
    reducer: {
        templateReducer,
    }
  })


export type RootState = ReturnType<typeof store.getState>