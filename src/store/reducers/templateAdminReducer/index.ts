import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateType } from '../../../modules/template/types/TemplateType'

interface TemplateState {
  templates: TemplateType[];
  template?: TemplateType;
}

const initialState: TemplateState = {
  templates: [],
  template: undefined
}

export const counterSlice = createSlice({
  name: 'templateAdminReducer',
  initialState,
  reducers: {

    setTemplateAction: (state, action: PayloadAction<TemplateType | undefined>) => {
      state.template = action.payload
    },

    setTemplatesAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.templates = action.payload
    }
  }
})

export const { setTemplatesAction } = counterSlice.actions

export default counterSlice.reducer