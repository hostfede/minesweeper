import { useGame } from '../../hooks/useGame';
import { GAME_DIFFICULTY, GAME_STATUS } from '../../utils/const';
import { useState } from 'react';
import './selector.scss';
import { validateMines } from '../../utils/validations';

function DifficultySelector() {
  const {
    startGame,
    setDifficulty,
    setCustomDifficulty,
    difficulty,
    gameStatus,
  } = useGame();
  const [customMines, setCustomMines] = useState(0);
  const [customRows, setCustomRows] = useState(0);
  const [customCols, setCustomCols] = useState(0);

  const [errorMsg, setErrorMsg] = useState(null);
  const [state, setState] = useState('pending');

  function handleCustomDifficulty() {
    const validation = validateMines(customRows, customCols, customMines);
    if (validation !== null) {
      setErrorMsg(validation);
      setState('error');
    } else {
      setCustomDifficulty({
        rows: customRows,
        cols: customCols,
        mines: customMines,
      });

      setState('ok');
    }
  }

  return (
    <div className="difficulty-selector">
      {gameStatus !== GAME_STATUS.PLAYING && (
        <div className="difficulty-buttons">
          <button
            className={`easy ${difficulty === GAME_DIFFICULTY.EASY ? 'selected' : ''}`}
            onClick={() => setDifficulty(GAME_DIFFICULTY.EASY)}
          >
            Easy
          </button>
          <button
            className={`normal ${difficulty === GAME_DIFFICULTY.NORMAL ? 'selected' : ''}`}
            onClick={() => setDifficulty(GAME_DIFFICULTY.NORMAL)}
          >
            Normal
          </button>
          <button
            className={`hard ${difficulty === GAME_DIFFICULTY.HARD ? 'selected' : ''}`}
            onClick={() => setDifficulty(GAME_DIFFICULTY.HARD)}
          >
            Hard
          </button>
          <button
            className={`custom ${difficulty === GAME_DIFFICULTY.CUSTOM ? 'selected' : ''}`}
            onClick={() => setDifficulty(GAME_DIFFICULTY.CUSTOM)}
          >
            Custom
          </button>
        </div>
      )}

      {difficulty === GAME_DIFFICULTY.CUSTOM &&
        gameStatus !== GAME_STATUS.PLAYING && (
          <div className="custom-settings">
            <div className="custom-input">
              <span>Rows</span>
              <input
                type="number"
                placeholder="Rows"
                value={customRows}
                onChange={(e) => {
                  setCustomRows(Number(e.target.value));
                  setState('pending');
                }}
              />
            </div>
            <div className="custom-input">
              <span>Columns</span>
              <input
                type="number"
                placeholder="Columns"
                value={customCols}
                onChange={(e) => {
                  setCustomCols(Number(e.target.value));
                  setState('pending');
                }}
              />
            </div>
            <div className="custom-input">
              <span>Mines</span>
              <input
                type="number"
                placeholder="Mines"
                value={customMines}
                onChange={(e) => {
                  setCustomMines(Number(e.target.value));
                  setState('pending');
                }}
              />
            </div>
            <div className="custom-set">
              <button onClick={handleCustomDifficulty}>Set custom</button>
            </div>
          </div>
        )}
      {state === 'error' && <p className="error-msg">{errorMsg}</p>}
      {state === 'ok' && <p className="ok-msg">Difficulty set!</p>}
      {gameStatus !== GAME_STATUS.PLAYING && (
        <button onClick={startGame} className="start-button">
          Start Game!
        </button>
      )}
    </div>
  );
}

export default DifficultySelector;
