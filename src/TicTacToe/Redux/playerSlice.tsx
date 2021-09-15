import React from 'react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PlayerState {
  players: {
    player1: string
    player2: string
    AI: string
  }
  nextTurn: boolean
  win: boolean
}
const initialState: PlayerState = {
  players: {
    player1: '',
    player2: '',
    AI: 'AI',
  },
  nextTurn: false,
  win: false,
}

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    firstPlayer: (state, action: PayloadAction<string>) => {
      state.players.player1 = action.payload
    },
    secondPlayer: (state, action: PayloadAction<string>) => {
      state.players.player2 = action.payload
    },
    winGame: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload
    },
  },
})

export const { firstPlayer, secondPlayer, winGame } = playerSlice.actions
export const selectPlayers = (state: RootState) => state.player.players
export const selectWinGame = (state: RootState) => state.player.win
export const selectNextTurn = (state: RootState) => state.player.nextTurn

export default playerSlice.reducer
