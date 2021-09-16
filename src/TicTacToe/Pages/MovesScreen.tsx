import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  firstPlayerScore,
  secondPlayerScore,
  selectPlayers,
} from '../Redux/playerSlice'
import { FindBestMovements } from '../Components/Scores'
import { CalculateMovements } from '../Components/CalculateMoves'
import { SymbolesO, SymbolesX } from '../Components/Symbole'
import { Lists, ButtonContainer, Button } from '../globalStyles/fonts/styles'
import { selectTimer } from '../Redux/timerSlice'
import { startGame } from '../Redux/startGameSlice'

export function MovesScreen() {
  const dispatch = useAppDispatch()
  const players = useAppSelector(selectPlayers)
  const timer = useAppSelector(selectTimer)
  const [countTime, setCountTime] = useState<number>(timer)
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
    squares[i] = moves.isNext ? 'X' : 'O'
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
    const bestMoves = FindBestMovements(click, moves.isNext ? 'X' : 'O')
    if (bestMoves !== -1) {
      await handleMoves(bestMoves)
    }
  }

  const history = moves?.history
  const current = history[moves?.history.length - 1]
  const winner = CalculateMovements(current?.squares)
  const collectPieces = moves.history.filter((item) => item !== null).length

  let capitaliseName2 =
    players.player2.charAt(0).toUpperCase() +
    players.player2.toLocaleLowerCase().slice(1)
  let capitaliseName1 =
    players.player1.charAt(0).toUpperCase() +
    players.player1.toLocaleLowerCase().slice(1)

  useEffect(() => {
    countTime !== 0 && winner === 'X' && dispatch(firstPlayerScore())
    countTime !== 0 && winner === 'O' && dispatch(secondPlayerScore())
    if (countTime === 0 && moves.isNext && !winner && collectPieces !== 10) {
      dispatch(secondPlayerScore())
    }
    if (countTime === 0 && !moves.isNext && !winner && collectPieces !== 10) {
      dispatch(firstPlayerScore())
    }
  }, [moves.isNext, countTime, dispatch, winner, collectPieces])

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (collectPieces !== 10) {
        if (winner === undefined) countTime > 0 && setCountTime(countTime - 1)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  }, [countTime])

  function displayStaus() {
    if (countTime === 0) {
      if (collectPieces !== 10) {
        return (
          <h3>
            Time out- {moves.isNext ? capitaliseName1 : capitaliseName2} won
          </h3>
        )
      }
    } else if (collectPieces === 10) {
      return <h3>Draw!</h3>
    } else if (winner === 'X') {
      return <h3>{capitaliseName1} won</h3>
    } else if (winner === 'O') {
      return <h3>{capitaliseName2} won</h3>
    } else {
      return <h3>{moves.isNext ? capitaliseName1 : capitaliseName2}'s turn</h3>
    }
  }

  function renderButtons(i: any) {
    function symboles() {
      if (current.squares[i] === 'X') {
        return <SymbolesX />
      } else if (current.squares[i] === 'O') {
        return <SymbolesO />
      } else {
        return current.squares[i]
      }
    }
    return (
      <button
        value={current.squares[i]}
        disabled={countTime === 0}
        onClick={() => handleClick(i)}>
        {symboles()}
      </button>
    )
  }

  function restartGame() {
    const restart = (
      <Button onClick={() => dispatch(startGame())}>Restart</Button>
    )
    if (collectPieces === 10) {
      if (winner === undefined) {
        return restart
      }
    } else if (countTime > 0) {
      if (winner === undefined) {
        return <span>Time left: {countTime}s</span>
      } else {
        return restart
      }
    }
    return restart
  }

  function drawLine() {
    const topline =
      [current.squares[0], current.squares[1], current.squares[2]].join('') ===
        'XXX' ||
      [current.squares[0], current.squares[1], current.squares[2]].join('') ===
        'OOO'
    const centerline =
      [current.squares[3], current.squares[4], current.squares[5]].join('') ===
        'XXX' ||
      [current.squares[3], current.squares[4], current.squares[5]].join('') ===
        'OOO'
    const bottomline =
      [current.squares[6], current.squares[7], current.squares[8]].join('') ===
        'XXX' ||
      [current.squares[6], current.squares[7], current.squares[8]].join('') ===
        'OOO'
    const leftline =
      [current.squares[2], current.squares[4], current.squares[6]].join('') ===
        'XXX' ||
      [current.squares[2], current.squares[4], current.squares[6]].join('') ===
        'OOO'
    const rightline =
      [current.squares[0], current.squares[4], current.squares[8]].join('') ===
        'XXX' ||
      [current.squares[0], current.squares[4], current.squares[8]].join('') ===
        'OOO'
    const verticalLeftline =
      [current.squares[0], current.squares[3], current.squares[6]].join('') ===
        'XXX' ||
      [current.squares[0], current.squares[3], current.squares[6]].join('') ===
        'OOO'
    const verticalMiddleline =
      [current.squares[1], current.squares[4], current.squares[7]].join('') ===
        'XXX' ||
      [current.squares[1], current.squares[4], current.squares[7]].join('') ===
        'OOO'
    const verticalRightline =
      [current.squares[2], current.squares[5], current.squares[8]].join('') ===
        'XXX' ||
      [current.squares[2], current.squares[5], current.squares[8]].join('') ===
        'OOO'

    if (topline) {
      return 'top'
    } else if (centerline) {
      return 'center'
    } else if (bottomline) {
      return 'bottom'
    } else if (rightline) {
      return 'right'
    } else if (leftline) {
      return 'left'
    } else if (verticalLeftline) {
      return 'vertical-left'
    } else if (verticalRightline) {
      return 'Vertical-right'
    } else if (verticalMiddleline) {
      return 'Vertical-middle'
    }
  }

  return (
    <ButtonContainer>
      {displayStaus()}

      <Lists>
        <div className={drawLine()}>
          {renderButtons(1)}
          {renderButtons(2)}
          {renderButtons(3)}
        </div>

        <div className={drawLine()}>
          {renderButtons(4)}
          {renderButtons(5)}
          {renderButtons(6)}
        </div>

        <div className={drawLine()}>
          {renderButtons(7)}
          {renderButtons(8)}
          {renderButtons(9)}
        </div>
      </Lists>

      {restartGame()}
    </ButtonContainer>
  )
}
