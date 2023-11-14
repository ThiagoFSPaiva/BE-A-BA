import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateType } from '../../../modules/template/types/TemplateType'

interface TemplateState {
  templatesAtivos: TemplateType[];
  templatesPendentes: TemplateType[];
  templatesInativos: TemplateType[]
}

const initialState: TemplateState = {
    templatesAtivos: [],
    templatesPendentes: [],
    templatesInativos: []
}

export const counterSlice = createSlice({
  name: 'templateAdminReducer',
  initialState,
  reducers: {
    setAtivosAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.templatesAtivos = action.payload
    },
    setPendentesAction: (state, action: PayloadAction<TemplateType[]>) => {
      state.templatesPendentes = action.payload
    },
    setInativosAction: (state, action: PayloadAction<TemplateType[]>) => {
        state.templatesInativos = action.payload
      }
  }
})

export const { setAtivosAction,setPendentesAction,setInativosAction  } = counterSlice.actions

export default counterSlice.reducer