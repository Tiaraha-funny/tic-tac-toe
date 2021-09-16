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
  score: number
}
const initialState: PlayerState = {
  players: {
    player1: '',
    player2: '',
    AI: 'AI',
  },
  nextTurn: false,
  win: false,
  score: 0,
}

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    firstPlayer: (state, action: PayloadAction<string>) => {
      state.players.player1 = action.payload
    },
    firstPlayerScore: (state) => {
      state.score += 1
      state.win = true
    },
    secondPlayer: (state, action: PayloadAction<string>) => {
      state.players.player2 = action.payload
    },
    secondPlayerScore: (state) => {
      state.players.player2 += 1
      state.win = true
    },
    winGame: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload
    },
  },
})

export const {
  firstPlayer,
  secondPlayer,
  firstPlayerScore,
  secondPlayerScore,
  winGame,
} = playerSlice.actions
export const selectPlayers = (state: RootState) => state.players.players
export const selectWinGame = (state: RootState) => state.players.win
export const selectScore = (state: RootState) => state.players.score
export const selectNextTurn = (state: RootState) => state.players.nextTurn

export default playerSlice.reducer
