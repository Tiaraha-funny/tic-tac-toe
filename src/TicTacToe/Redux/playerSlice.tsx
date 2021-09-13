import React from "react";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../store';

export interface PlayerState {
  players: {
    player1: string,
    player2: string
  }
  timer: {
    initialTime: number,
    startTimer: boolean
  }
  start: boolean
}
const initialState: PlayerState = {
  players : {
    player1: '',
    player2: '',
  },
  timer: {
    initialTime: 10,
    startTimer: false
  },
  start: false
};

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    firstPlayer: (state, action: PayloadAction<string>) => {
       state.players.player1 = action.payload
    },
    secondPlayer: (state, action: PayloadAction<string>) => {
      state.players.player2 = action.payload;
    },
    startGame: (state, action: PayloadAction<number>) => {
      state.timer.initialTime = action.payload;
      if(action.payload > 0) {
        setTimeout(() => {
         return action.payload--
        }, 1000);
      }
    },
  }
})


export const { firstPlayer, secondPlayer, startGame } = playerSlice.actions;
export const selectPlayers = (state: RootState) => state.player.players;
export const selectTimer = (state: RootState) => state.player.timer;
export const selectStart = (state: RootState) => state.player.start;

export default playerSlice.reducer;
