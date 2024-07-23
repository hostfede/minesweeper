import { createContext, useReducer } from 'react';
import { gameReducer, initialState } from '../reducers/game';
import { GAME_ACTIONS } from '../utils/const';

export const GameContext = createContext();

function useGameReducer() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  function startGame() {
    dispatch({
      type: GAME_ACTIONS.START_GAME,
    });
  }

  function uncoverCell({ row, col }) {
    dispatch({
      type: GAME_ACTIONS.UNCOVER_CELL,
      payload: { row, col },
    });
  }

  function flagCell({ row, col }) {
    dispatch({
      type: GAME_ACTIONS.FLAG_CELL,
      payload: { row, col },
    });
  }

  function resetGame() {
    dispatch({
      type: GAME_ACTIONS.RESET_GAME,
    });
  }

  function setDifficulty(difficulty) {
    dispatch({
      type: GAME_ACTIONS.SET_DIFFICULTY,
      payload: difficulty,
    });
  }

  function setCustomDifficulty({ rows, cols, mines }) {
    dispatch({
      type: GAME_ACTIONS.CUSTOM_DIFFICULTY,
      payload: { rows, cols, mines },
    });
  }

  return {
    state,
    uncoverCell,
    flagCell,
    startGame,
    resetGame,
    setDifficulty,
    setCustomDifficulty,
  };
}

export function GameProvider({ children }) {
  const {
    state,
    uncoverCell,
    flagCell,
    startGame,
    resetGame,
    setDifficulty,
    setCustomDifficulty,
  } = useGameReducer();
  return (
    <GameContext.Provider
      value={{
        board: state.board,
        uncoverCell,
        flagCell,
        startGame,
        resetGame,
        setDifficulty,
        setCustomDifficulty,
        gameStatus: state.gameStatus,
        rows: state.rows,
        cols: state.cols,
        mines: state.mines,
        flags: state.flags,
        difficulty: state.difficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
