import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface GlobalState {
    dadosTemplate?: any[];
}

// Define the initial state using that type
const initialState: GlobalState = {
    dadosTemplate: [],
};

export const counterSlice = createSlice({
  name: 'dashboardReducer',
  initialState,
  reducers: {
    setDadosTemplateAction: (state, action: PayloadAction<any>) => {
      state.dadosTemplate = action.payload
    }
  }
})

export const { setDadosTemplateAction } = counterSlice.actions

export default counterSlice.reducer