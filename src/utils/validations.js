export function validateMines(rows, cols, mines) {
  const maxMines = rows * cols - 1;

  if (rows < 1) {
    return `The minimum number of rows is 1.`;
  }
  if (cols < 1) {
    return `The minimum number of columns is 1.`;
  }

  if (mines < 1) {
    return `The minimum number of mines is 1.`;
  }

  if (mines > maxMines) {
    return `The maximum number of mines is ${maxMines} for a ${rows}x${cols} board.`;
  }

  return null;
}
