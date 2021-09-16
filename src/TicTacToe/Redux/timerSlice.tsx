import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface StartState {
  timer: number
}

const initialState: StartState = {
  timer: 3,
}

export const addTimerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    timer: (state) => {
      state.timer = 3
    },
    handleTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload
    },
  },
})

export const { timer, handleTimer } = addTimerSlice.actions

export const selectTimer = (state: RootState) => state.timer.timer

export default addTimerSlice.reducer
