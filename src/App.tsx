import React from 'react'
import { Container, Header, Title } from './TicTacToe/globalStyles/fonts/styles'
import { useAppSelector } from './TicTacToe/hooks'
import { MovesScreen } from './TicTacToe/Pages/MovesScreen'
import { StartScreen } from './TicTacToe/Pages/StartScreen'
import { selectStartGame } from './TicTacToe/Redux/startGameSlice'

function App() {
  const start = useAppSelector(selectStartGame)
  return (
    <Container>
      <Header>
        <Title>Tic Toc Toe</Title>
      </Header>
      {start ? <MovesScreen /> : <StartScreen />}
    </Container>
  )
}

export default App
