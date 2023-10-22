import  {configureStore} from '@reduxjs/toolkit';
import templateReducer from './reducers/templateReducer';
import globalReducer from './reducers/globalReducer';

export const store = configureStore({
    reducer: {
        templateReducer,
        globalReducer
    }
  })


export type RootState = ReturnType<typeof store.getState>