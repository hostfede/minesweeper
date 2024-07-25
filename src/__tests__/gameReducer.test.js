import { gameReducer } from '../reducers/game';
import { generateBoard } from '../utils/board';
import {
  DEFAULT_COLS,
  DEFAULT_MINES,
  DEFAULT_ROWS,
  GAME_ACTIONS,
  GAME_DIFFICULTY,
  GAME_STATUS,
} from '../utils/const';
import { deepClone } from '../utils/utils';

const initialState = {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS,
  mines: DEFAULT_MINES,
  board: generateBoard(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_MINES),
  gameStatus: GAME_STATUS.STOPPED,
  flags: DEFAULT_MINES,
  difficulty: GAME_DIFFICULTY.NORMAL,
  startTime: null,
  endTime: null,
};

describe('gameReducer tests...', () => {
  it('Should start a new game, with a new board.', () => {
    const action = { type: GAME_ACTIONS.START_GAME };
    const state = gameReducer(initialState, action);
    expect(state.gameStatus).toBe(GAME_STATUS.PLAYING);
    expect(state.board).not.toBe(initialState.board);
  });

  it('Should uncover the cell and lose the game.', () => {
    const minedBoard = deepClone(initialState.board);

    minedBoard[0][0].isMined = true;

    const minedState = {
      ...initialState,
      board: minedBoard,
    };

    const action = {
      type: GAME_ACTIONS.UNCOVER_CELL,
      payload: { row: 0, col: 0, config: {} },
    };

    const state = gameReducer(minedState, action);
    expect(state.gameStatus).toBe(GAME_STATUS.LOSE);
  });

  it('Sholud uncover the cell and win the game', () => {
    const minedBoard = generateBoard(4, 4, 0);
    minedBoard[0][0].isMined = true;

    const newState = { ...initialState, board: minedBoard };

    const action = {
      type: GAME_ACTIONS.UNCOVER_CELL,
      payload: { row: 1, col: 1, config: {} },
    };

    const state = gameReducer(newState, action);

    expect(state.gameStatus).toBe(GAME_STATUS.WIN);
  });

  // it('should handle SET_DIFFICULTY action', () => {
  //   const action = {
  //     type: GAME_ACTIONS.SET_DIFFICULTY,
  //     payload: GAME_DIFFICULTY.HARD,
  //   };
  //   const state = gameReducer(initialState, action);
  //   expect(state.difficulty).toBe(GAME_DIFFICULTY.HARD);
  //   expect(state.rows).toBe(16);
  //   expect(state.cols).toBe(30);
  //   expect(state.mines).toBe(99);
  // });
});
