import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../../modules/login/types/UserType';
import { NotificationType } from '../../../shared/types/NotificationType';

// Define a type for the slice state
interface GlobalState {
    user?: UserType;
    notification?: NotificationType;
}

const initialState: GlobalState = {
  user: undefined,
  notification: undefined,
};

export const counterSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload
    },
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    }
  }
})

export const { setUserAction, setNotificationAction } = counterSlice.actions

export default counterSlice.reducer