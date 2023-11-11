
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UploadType } from '../../../modules/Uploads/types/UploadType';


interface UploadsState {
  uploads: UploadType[];
}

const initialState: UploadsState = {
    uploads: [],
};

export const counterSlice = createSlice({
  name: 'uploadReducer',
  initialState,
  reducers: {
    setUploadsAction: (state, action: PayloadAction<UploadType[]>) => {
      state.uploads = action.payload;
    },
  },
});

export const { setUploadsAction } = counterSlice.actions;

export default counterSlice.reducer;