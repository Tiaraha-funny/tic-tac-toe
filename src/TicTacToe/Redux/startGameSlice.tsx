import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface StartState {
  start: boolean
}

const initialState: StartState = {
  start: false,
}

export const startSlice = createSlice({
  name: 'start',
  initialState,
  reducers: {
    startGame: (state) => {
      state.start = !state.start
    },
    handleStartgame: (state, action: PayloadAction<boolean>) => {
      state.start = action.payload
    },
  },
})

export const { startGame, handleStartgame } = startSlice.actions
export const selectStartGame = (state: RootState) => state.start.start

export default startSlice.reducer
