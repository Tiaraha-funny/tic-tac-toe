export function CalculateMovements(moves: any) {
  const possibleMovements = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < possibleMovements?.length; i++) {
    const [firstIndex, secondIndex, lastIndex] = possibleMovements[i]
    if (
      moves[firstIndex] &&
      moves[firstIndex] === moves[secondIndex] &&
      moves[firstIndex] === moves[lastIndex]
    ) {
      return moves[firstIndex]
    }
  }
}
