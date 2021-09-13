import { useState} from 'react';
import styled from 'styled-components'
import { fonts } from '../globalStyles/fonts/fonts';
import { useAppDispatch, useAppSelector } from '../hooks';
import player1 from "../images/circle.svg";
import player2 from "../images/cross.svg";
import { firstPlayer, secondPlayer, selectTimer, selectPlayers, startGame } from '../Redux/playerSlice';
import { MovesScreen } from './MovesScreen';

export interface StartProps {
  start?: boolean
}

export function StartScreen () {
  const players = useAppSelector(selectPlayers)
  const timer = useAppSelector(selectTimer)
  const dispatch = useAppDispatch();
  const [start, setStart] = useState<boolean>(false)

  function handleStartGame() {
    setStart(!start)
    dispatch(startGame)
  }

  return (
    <Container>
      <Header>
        <Title>Tic Toc Toe</Title>
      </Header>
        
      {!start ?  
      (<>
      <Wrapper>
          <Image src={player1} alt='first player has circle symbol' />
          <Input 
          type="text" 
          placeholder="leave empty to use AI or enter player name" 
          name="player1" 
          id="player1" 
          value={players.player1} onChange={(e) => dispatch(firstPlayer(e.target.value))} />
        </Wrapper>
        <Wrapper>
          <Image src={player2} alt='Second player has cross symbol'/>
        <Input type="text" placeholder="leave empty to use AI or enter player name" name="player2" id="player2" value={players.player2} onChange={(e) => dispatch(secondPlayer(e.target.value))} />
        </Wrapper>
        <Wrapper>
         <TitleTimer> Turn time limit in seconds: {timer.initialTime}s</TitleTimer>
      </Wrapper>      
      <Button
          onClick={handleStartGame}
        >Start</Button>
        </>
      )
    : <MovesScreen/> 
    }
      
    </Container>
  );
}

const Container = styled.section`
  ${fonts}
  max-width: fit-content;
  margin: auto;
  line-height: 72px;
  text-align: center;

  img {
    width:100%;
  }
`
const Header = styled.header``
const Title = styled.h1`
  ${fonts}
font-size: 72px;
`

const Input = styled.input`
  width: 100%;
  font-size: 48px;
  line-height: 48px;
  border: none;
  outline: none;
  ::placeholder {
  font-style: normal;
  font-weight: normal;
  color: #8B8585;
  }
`
const Button = styled.button`
font-size: 72px;
line-height: 72px;
text-align: center;
cursor: pointer;
color: #000000;
border: none;
outline: none;
background-color: transparent;
`

const Wrapper = styled.label`
align-items: center;
display: flex;
gap: 20px;
line-height: 50px;
margin-bottom: 50px;
`
const Image = styled.img`
  max-width: 85px;
`

const TitleTimer = styled.span`
font-size: 48px;
line-height: 48px;
color: #000000;

`