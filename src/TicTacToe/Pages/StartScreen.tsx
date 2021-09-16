import {
  Button,
  Input,
  TitleTimer,
  Wrapper,
  Image,
  InputTime,
} from '../globalStyles/fonts/styles'
import { useAppDispatch, useAppSelector } from '../hooks'
import player1 from '../images/circle.svg'
import player2 from '../images/cross.svg'
import { firstPlayer, secondPlayer, selectPlayers } from '../Redux/playerSlice'
import { startGame } from '../Redux/startGameSlice'
import { handleTimer, selectTimer } from '../Redux/timerSlice'

export function StartScreen() {
  const players = useAppSelector(selectPlayers)
  const dispatch = useAppDispatch()
  const timer = useAppSelector(selectTimer)

  return (
    <>
      <Wrapper>
        <Image src={player1} alt='first player has circle symbol' />
        <Input
          type='text'
          placeholder='leave empty to use AI or enter player name'
          name='player1'
          id='player1'
          value={players.player1}
          onChange={(e) => dispatch(firstPlayer(e.target.value))}
        />
      </Wrapper>
      <Wrapper>
        <Image src={player2} alt='Second player has cross symbol' />
        <Input
          type='text'
          placeholder='leave empty to use AI or enter player name'
          name='player2'
          id='player2'
          value={players.player2}
          onChange={(e) => dispatch(secondPlayer(e.target.value))}
        />
      </Wrapper>
      <Wrapper>
        <TitleTimer>Turn time limit in seconds: </TitleTimer>
        <InputTime
          type='number'
          value={timer}
          onChange={(e) => dispatch(handleTimer(Number(e.target.value)))}
          placeholder='3'
        />
        <div>S</div>
      </Wrapper>

      <Button onClick={() => dispatch(startGame())}>Start</Button>
    </>
  )
}
