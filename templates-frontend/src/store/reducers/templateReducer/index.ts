import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateType } from '../../../modules/template/types/TemplateType'

interface TemplateState {
  templateAtivos: TemplateType[];
  meusTemplatesPendentes: TemplateType[];
  meusTemplatesInativos:  TemplateType[];
}

const initialState: TemplateState = {
  templateAtivos: [],
  meusTemplatesPendentes: [],
  meusTemplatesInativos: []
}

export const counterSlice = createSlice({
  name: 'templateReducer',
  initialState,
  reducers: {
    setTemplatesAtivosAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.templateAtivos = action.payload
    },
    setMeusTemplatesPendentesAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.meusTemplatesPendentes = action.payload
    },
    setMeusTemplatesInativosAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.meusTemplatesInativos = action.payload
    },
  }
})

export const { setTemplatesAtivosAction,setMeusTemplatesPendentesAction,setMeusTemplatesInativosAction  } = counterSlice.actions

export default counterSlice.reducer