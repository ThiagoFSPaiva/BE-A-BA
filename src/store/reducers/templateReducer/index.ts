import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateType } from '../../../modules/template/types/TemplateType'

interface TemplateState {
  templateAtivos: TemplateType[];
  meusTemplates: TemplateType[];
}

const initialState: TemplateState = {
  templateAtivos: [],
  meusTemplates: []
}

export const counterSlice = createSlice({
  name: 'templateReducer',
  initialState,
  reducers: {
    setTemplatesAtivosAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.templateAtivos = action.payload
    },
    setMeusTemplatesAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.meusTemplates = action.payload
    }
  }
})

export const { setTemplatesAtivosAction,setMeusTemplatesAction  } = counterSlice.actions

export default counterSlice.reducer