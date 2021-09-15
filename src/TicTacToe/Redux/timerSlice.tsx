import { useState } from 'react'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface StartState {
  timer: number
  status: 'add-timer'
}

const initialState: StartState = {
  timer: 3,
  status: 'add-timer',
}

export const addTimerSlice = createSlice({
  name: 'add-timer',
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
