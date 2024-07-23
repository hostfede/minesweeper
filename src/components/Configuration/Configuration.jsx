import { useEffect, useState } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { useDebounce } from '../../hooks/useDebounce';
import { MINES_STYLES } from '../../utils/const';
import './configuration.scss';

function Configuration() {
  const { config, setMineStyle, setName } = useConfig();
  const [nameInput, setNameInput] = useState(config.name);
  const debouncedName = useDebounce(nameInput, 500);

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  return (
    <div className="config-form">
      <div>
        <span>Player name:</span>
        <input
          id="name"
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </div>
      <div>
        <span>Mines style:</span>
        <select
          value={config.mineStyle}
          onChange={(e) => setMineStyle(e.target.value)}
          id="mineStyle"
        >
          <option value={MINES_STYLES.ORIGINAL}>Original</option>
          <option value={MINES_STYLES.HEART}>Heart</option>
          <option value={MINES_STYLES.DIAMOND}>Diamond</option>
          <option value={MINES_STYLES.STAR}>Star</option>
        </select>
      </div>
    </div>
  );
}

export default Configuration;
