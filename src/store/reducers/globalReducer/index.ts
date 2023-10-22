import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../../modules/login/types/UserType';

// Define a type for the slice state
interface GlobalState {
    user?: UserType;
}

// Define the initial state using that type
const initialState: GlobalState = {
  user: undefined,
};

export const counterSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    }
  }
})

export const { setUserAction } = counterSlice.actions

export default counterSlice.reducer