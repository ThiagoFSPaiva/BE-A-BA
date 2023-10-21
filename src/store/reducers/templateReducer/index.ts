import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateType } from '../../../modules/template/types/TemplateType'

// Define a type for the slice state
interface TemplateState {
  template: TemplateType[];
}

// Define the initial state using that type
const initialState: TemplateState = {
  template: [],
}

export const counterSlice = createSlice({
  name: 'templateReducer',
  initialState,
  reducers: {
    setTemplateAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.template = action.payload
    }
  }
})

export const { setTemplateAction } = counterSlice.actions

export default counterSlice.reducer