import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import playerReducer from '../TicTacToe/Redux/playerSlice'
import startReducer from '../TicTacToe/Redux/startGameSlice'
import timerReducer from '../TicTacToe/Redux/timerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    player: playerReducer,
    start: startReducer,
    timer: timerReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
