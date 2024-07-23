import { useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import useTimer from '../../hooks/useTimer';
import { GAME_STATUS } from '../../utils/const';
import Cell from './Cell';
import { formatSecMili } from '../../utils/time';
import './board.scss';

function Board() {
  const { board, uncoverCell, flagCell, gameStatus, flags, mines, resetGame } =
    useGame();
  const { seconds, milliseconds, startTimer, stopTimer, resetTimer } =
    useTimer();

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      startTimer();
    } else {
      stopTimer();
    }

    if (gameStatus === GAME_STATUS.STOPPED) {
      resetTimer();
    }
  }, [gameStatus]);

  function handleReset() {
    resetGame();
    resetTimer();
  }

  return (
    <div className="container">
      <div className="status">
        {gameStatus === GAME_STATUS.PLAYING && (
          <div className="game-status">
            <span>🚩{flags}</span>
            <span>💣{mines}</span>
            <span>⏱️{formatSecMili(seconds, milliseconds)}</span>
          </div>
        )}
        <div className="container">
          <button className="reset-button" onClick={handleReset}>
            😅
          </button>
        </div>
      </div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isFlagged={cell.isFlagged}
              isMined={cell.isMined}
              isHidden={cell.isHidden}
              minesAround={cell.minesAround}
              onClick={() => {
                if (gameStatus === GAME_STATUS.PLAYING) {
                  uncoverCell({ row: rowIndex, col: colIndex });
                }
              }}
              onRightClick={() => {
                if (gameStatus === GAME_STATUS.PLAYING) {
                  flagCell({ row: rowIndex, col: colIndex });
                }
              }}
            />
          ))}
        </div>
      ))}
      {gameStatus === GAME_STATUS.WIN && (
        <div className="message you-won">You won!</div>
      )}
      {gameStatus === GAME_STATUS.LOSE && (
        <div className="message you-lost">You lost!</div>
      )}
    </div>
  );
}

export default Board;
