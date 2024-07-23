import { addRecord } from '../services/records';
import { checkWin, generateBoard, uncoverCell } from '../utils/board';
import {
  DEFAULT_COLS,
  DEFAULT_MINES,
  DEFAULT_ROWS,
  GAME_ACTIONS,
  GAME_DIFFICULTY,
  GAME_STATUS,
} from '../utils/const';
import { getDifferenceInSeconds } from '../utils/time';

export const initialState = JSON.parse(
  window.localStorage.getItem('state'),
) || {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS,
  mines: DEFAULT_MINES,
  board: generateBoard(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES),
  gameStatus: GAME_STATUS.STOPPED,
  flags: DEFAULT_MINES,
  difficulty: GAME_DIFFICULTY.NORMAL,
  startTime: new Date(),
  endTime: new Date(),
};

function updateLocalStorage(state) {
  window.localStorage.setItem('state', JSON.stringify(state));
}

export function gameReducer(state, action) {
  const { type, payload } = action;
  const newState = structuredClone(state);

  switch (type) {
    case GAME_ACTIONS.START_GAME: {
      // const newState = structuredClone(state);

      const newBoard = generateBoard(state.rows, state.cols, state.mines);
      newState.board = newBoard;
      newState.gameStatus = GAME_STATUS.PLAYING;
      newState.flags = state.mines;
      newState.startTime = new Date();
      updateLocalStorage(newState);
      return newState;
    }

    case GAME_ACTIONS.UNCOVER_CELL: {
      const { row, col, config } = payload;
      // const newState = structuredClone(state);

      if (newState.board[row][col].isMined) {
        for (let i = 0; i < newState.board.length; i++) {
          for (let j = 0; j < newState.board[0].length; j++) {
            if (newState.board[i][j].isMined) {
              newState.board[i][j].isHidden = false;
            }
          }
        }

        newState.gameStatus = GAME_STATUS.LOSE;
        newState.endTime = new Date();

        addRecord({
          name: config.name,
          difficulty: newState.difficulty,
          startTime: newState.startTime,
          endTime: newState.endTime,
          timeSpend: getDifferenceInSeconds(
            newState.startTime,
            newState.endTime,
          ),
          gameStatus: newState.gameStatus,
        });

        updateLocalStorage(newState);
        return newState;
      }

      uncoverCell(newState.board, row, col);

      if (checkWin(newState.board)) {
        newState.gameStatus = GAME_STATUS.WIN;
        newState.endTime = new Date();

        for (let i = 0; i < newState.board.length; i++) {
          for (let j = 0; j < newState.board[0].length; j++) {
            if (newState.board[i][j].isMined) {
              newState.board[i][j].isHidden = false;
            }
          }
        }

        addRecord({
          name: config.name,
          difficulty: newState.difficulty,
          startTime: newState.startTime,
          endTime: newState.endTime,
          timeSpend: getDifferenceInSeconds(
            newState.startTime,
            newState.endTime,
          ),
          gameStatus: newState.gameStatus,
        });
        updateLocalStorage(newState);
        return newState;
      } else {
        updateLocalStorage(newState);
        return newState;
      }
    }

    case GAME_ACTIONS.FLAG_CELL: {
      const { row, col } = payload;
      // const newState = structuredClone(state);

      if (newState.board[row][col].isHidden) {
        if (newState.board[row][col].isFlagged) {
          newState.board[row][col].isFlagged = false;
          newState.flags++;
        } else {
          if (newState.flags === 0) {
            updateLocalStorage(state);
            return state;
          }
          newState.board[row][col].isFlagged = true;
          newState.flags--;
        }
      }
      updateLocalStorage(newState);
      return newState;
    }

    case GAME_ACTIONS.RESET_GAME: {
      // const newState = structuredClone(state);
      newState.board = generateBoard(
        newState.rows,
        newState.cols,
        newState.mines,
      );
      newState.gameStatus = GAME_STATUS.STOPPED;
      updateLocalStorage(newState);
      return newState;
    }

    case GAME_ACTIONS.SET_DIFFICULTY: {
      // const newState = structuredClone(state);
      switch (payload) {
        case GAME_DIFFICULTY.EASY: {
          newState.rows = 9;
          newState.cols = 9;
          newState.mines = 10;
          newState.difficulty = GAME_DIFFICULTY.EASY;
          updateLocalStorage(newState);
          return newState;
        }
        case GAME_DIFFICULTY.NORMAL: {
          newState.rows = 16;
          newState.cols = 16;
          newState.mines = 40;
          newState.difficulty = GAME_DIFFICULTY.NORMAL;
          updateLocalStorage(newState);
          return newState;
        }
        case GAME_DIFFICULTY.HARD: {
          newState.rows = 16;
          newState.cols = 30;
          newState.mines = 99;
          newState.difficulty = GAME_DIFFICULTY.HARD;
          updateLocalStorage(newState);
          return newState;
        }
        case GAME_DIFFICULTY.CUSTOM: {
          newState.difficulty = GAME_DIFFICULTY.CUSTOM;
          updateLocalStorage(newState);
          return newState;
        }

        default: {
          updateLocalStorage(newState);
          return newState;
        }
      }
    }

    case GAME_ACTIONS.CUSTOM_DIFFICULTY: {
      // const newState = structuredClone(state);
      const { rows, cols, mines } = payload;
      newState.rows = rows;
      newState.cols = cols;
      newState.mines = mines;
      newState.difficulty = GAME_DIFFICULTY.CUSTOM;
      updateLocalStorage(newState);
      return newState;
    }
  }
}
