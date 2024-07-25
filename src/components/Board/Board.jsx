import { useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import useTimer from '../../hooks/useTimer';
import { GAME_STATUS } from '../../utils/const';
import Cell from './Cell';
import { formatSecMili } from '../../utils/time';
import './board.scss';
import { useConfig } from '../../hooks/useConfig';
import { mineStyle } from '../../utils/board';

function Board() {
  const { board, uncoverCell, flagCell, gameStatus, flags, mines, resetGame } =
    useGame();
  const { seconds, milliseconds, startTimer, resetTimer } = useTimer();
  const { config } = useConfig();

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      startTimer();
    } else {
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
            <span>
              {mineStyle(config.mineStyle)}
              {mines}
            </span>
            <span>⏱️{formatSecMili(seconds, milliseconds)}</span>
          </div>
        )}
        <div className="container">
          <button className="reset-button" onClick={handleReset}>
            😅
          </button>
        </div>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isFlagged={cell.isFlagged}
                isMined={cell.isMined}
                isHidden={cell.isHidden}
                minesAround={cell.minesAround}
                mineStyle={mineStyle(config.mineStyle)}
                onClick={() => {
                  if (gameStatus === GAME_STATUS.PLAYING) {
                    uncoverCell({
                      row: rowIndex,
                      col: colIndex,
                      config: config,
                    });
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
      </div>
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
