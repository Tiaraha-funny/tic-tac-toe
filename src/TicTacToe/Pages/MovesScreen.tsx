import React, { useState } from 'react';
import styled from 'styled-components'
import { calculateMovements } from '../Components/CalculateMoves';
import { useAppSelector } from '../hooks';
import { selectPlayers, selectTimer } from '../Redux/playerSlice';

export function MovesScreen () {
  const player = useAppSelector(selectPlayers)
  const timer = useAppSelector(selectTimer)
  const [ nextTurn, setNextTurn ] = useState<boolean>(true);
  const [ moves, setMoves ] = useState(Array(9).fill(null));
  const winner = calculateMovements(moves);


  function renderButtons(i: any) {
    const handleMoves = () => {
      if (moves[i] != null || winner != null) {
            return;
          }
          const nextmoves = moves.slice();
          nextmoves[i] = (nextTurn ? "X" : 'O');
          setMoves(nextmoves);
          setNextTurn(!nextTurn);
    }
    
  return <button value={moves[i]} onClick={handleMoves}>{moves[i]}</button>
}

  let capitaliseName2 = player.player2.charAt(0).toUpperCase() + player.player2.toLocaleLowerCase().slice(1)
  let capitaliseName1 = player.player1.charAt(0).toUpperCase() + player.player1.toLocaleLowerCase().slice(1)
  

  return (
    <Wrapper>
      <h3>{nextTurn ? capitaliseName1 : capitaliseName2}'s turn</h3>
    <Lists>
      <div>
          {renderButtons(1)}
          {renderButtons(2)}
          {renderButtons(3)}
      </div>

      <div>
          {renderButtons(4)}
          {renderButtons(5)}
          {renderButtons(6)}
      </div>

      <div>
          {renderButtons(7)}
          {renderButtons(8)}
          {renderButtons(9)}

      </div>
    </Lists>

      <span>time left {timer.initialTime} s</span>

      <div>
        <div >{}</div>
        <div >{}</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
position: relative;

span {
  margin-top: 100px;
  font-size: 48px;
  line-height: 48px;
  color: #000000;
}

h3 {
  font-size: 48px;
line-height: 48px;
}
`

const Lists = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 20px);
  grid-gap: 100px;
  margin-top: 78px;
  margin-bottom: 70px;

  div > button {
    width: 118px;
    height: 65px;
    margin-bottom: 19px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: none;
  }

  div:nth-of-type(1), div:nth-of-type(2) {
    border-right: solid 3px #545050;
    width: fit-content;
  }

   div > button:nth-of-type(1),div > button:nth-of-type(2) {
    border-bottom: solid 3px #545050;
  }
`