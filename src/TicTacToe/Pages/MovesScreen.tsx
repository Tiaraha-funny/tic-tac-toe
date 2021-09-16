import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { selectPlayers } from '../Redux/playerSlice'
import { FindBestMovements } from '../Components/Scores'
import { CalculateMovements } from '../Components/CalculateMoves'
import { SymbolesO, SymbolesX } from '../Components/Symbole'
import { Lists, ButtonContainer, Button } from '../globalStyles/fonts/styles'
import { selectTimer } from '../Redux/timerSlice'
import { startGame } from '../Redux/startGameSlice'
import { FillBoard } from '../Components/Board'

export function MovesScreen() {
  const dispatch = useAppDispatch()
  const players = useAppSelector(selectPlayers)
  const timer = useAppSelector(selectTimer)
  const [countTime, setCountTime] = useState(timer)
  const [moves, setMoves] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    isNext: true,
  })

  function handleMoves(i: any) {
    const movements = moves.history.slice(0, moves.stepNumber + 1)
    const current = movements[moves.history.length - 1]
    const squares = current.squares.slice()
    if (CalculateMovements(squares) || squares[i]) {
      return Promise.resolve()
    }
    squares[i] = moves.isNext ? <SymbolesX /> : <SymbolesO />
    const nextMovement = {
      history: movements.concat([{ squares: squares }]),
      stepNumber: movements.length,
      isNext: !moves.isNext,
    }
    return new Promise<void>((resolve) => {
      setMoves(nextMovement)
      return resolve
    })
  }

  async function handleClick(i: any) {
    await handleMoves(i)
    const click: any = moves.history[moves.stepNumber].squares.slice()
    const bestMoves = FindBestMovements(
      click,
      moves.isNext ? <SymbolesX /> : <SymbolesO />
    )

    if (bestMoves !== -1) {
      await handleMoves(bestMoves)
    }
    randomSet(i)
  }

  function randomSet(step: any) {
    setMoves({
      stepNumber: step,
      isNext: step % 2 === 0,
      history: [],
    })
  }

  const history = moves.history
  const current = history[moves.stepNumber]
  const winner = CalculateMovements(current.squares)

  let capitaliseName2 =
    players.player2.charAt(0).toUpperCase() +
    players.player2.toLocaleLowerCase().slice(1)
  let capitaliseName1 =
    players.player1.charAt(0).toUpperCase() +
    players.player1.toLocaleLowerCase().slice(1)

  const piecesCollector = moves.history.filter((item) => item !== null).length
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (piecesCollector !== 10) {
        countTime > 0 && setCountTime(countTime - 1)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [countTime])

  function displayStaus() {
    if (countTime === 0) {
      if (piecesCollector !== 10) {
        return (
          <h3>
            Time out- {moves.isNext ? capitaliseName1 : capitaliseName2} won
          </h3>
        )
      }
    }
    if (piecesCollector === 10) {
      return <h3>Draw!</h3>
    } else if (FillBoard(current.squares)) {
      setCountTime(0)
      return <h3>Draw!!</h3>
    } else if (winner === capitaliseName1) {
      return <h3>{capitaliseName1} won</h3>
    } else if (winner === capitaliseName2) {
      return <h3>{capitaliseName2} won</h3>
    } else {
      return <h3>{moves.isNext ? capitaliseName1 : capitaliseName2}'s turn</h3>
    }
  }

  function renderButtons(i: any) {
    return (
      <button
        value={current.squares[i]}
        onClick={countTime > 0 ? () => handleClick(i) : () => {}}>
        {current.squares[i]}
      </button>
    )
  }

  return (
    <ButtonContainer>
      {displayStaus()}
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

      {countTime > 0 ? (
        <span>Time left: {countTime}s</span>
      ) : (
        <Button onClick={() => dispatch(startGame())}>Restart</Button>
      )}
    </ButtonContainer>
  )
}
