import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { useConfig } from '../hooks/useConfig';
import { useDebounce } from '../hooks/useDebounce';

function Configuration() {
  const { config, setMineStyle, setName } = useConfig();
  const [nameInput, setNameInput] = useState(config.name);
  const debouncedName = useDebounce(nameInput, 500);

  useEffect(() => {
    setName(debouncedName);
  }, [debouncedName]);

  return (
    <div>
      <Header />
      <div>
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
            <option value="default">Default</option>
            <option value="heart">Heart</option>
            <option value="diamond">Diamond</option>
            <option value="star">Star</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Configuration;
