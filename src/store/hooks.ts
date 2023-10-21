import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector