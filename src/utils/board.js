const initialCell = {
  isMined: false,
  isHidden: true,
  isFlagged: false,
  minesAround: 0,
};

export function generateBoard(rows, cols, mines) {
  let gameBoard = [];

  //Obtener las posiciones de las minas aleatoriamente
  let minesPositions = [];
  while (minesPositions.length < mines) {
    const position = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    if (
      !minesPositions.some(
        (pos) => pos.x === position.x && pos.y === position.y,
      )
    ) {
      minesPositions.push(position);
    }
  }

  //Generar tablero inicial

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      if (minesPositions.some((pos) => pos.x === i && pos.y === j)) {
        row.push({ ...initialCell, isMined: true });
      } else {
        row.push(initialCell);
      }
    }
    gameBoard.push(row);
  }

  //Calcular el numero de minas alrededor de cada cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!gameBoard[i][j].isMined) {
        let minesAround = 0;
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              if (gameBoard[x][y].isMined) {
                minesAround++;
              }
            }
          }
        }
        gameBoard[i][j] = { ...gameBoard[i][j], minesAround: minesAround };
      }
    }
  }

  return gameBoard;
}

export function uncoverCell(board, row, col) {
  if (board[row][col].isHidden) {
    board[row][col].isHidden = false;
    //chequear si gano el juego == no quedan cells con isMined=false sin estar en isHidden=false

    if (board[row][col].minesAround === 0) {
      for (let x = row - 1; x <= row + 1; x++) {
        for (let y = col - 1; y <= col + 1; y++) {
          if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
            if (!(x === row && y === col)) {
              uncoverCell(board, x, y);
            }
          }
        }
      }
    }
  }
}

export function checkWin(board) {
  return !board.some((row) => {
    return row.some((cell) => !cell.isMined && cell.isHidden);
  });
}
