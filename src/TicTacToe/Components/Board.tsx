export function FillBoard(moves: any) {
  for (let i = 0; i < moves.length; i++) {
    if (moves[i] === null) {
      return false
    }
  }
  return true
}
