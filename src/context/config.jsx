import { createContext, useState } from 'react';

export const ConfigContext = createContext();

function updateLocalStorage(state) {
  window.localStorage.setItem('config', JSON.stringify(state));
}

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(
    JSON.parse(window.localStorage.getItem('config')) || {
      name: 'Jane Doe',
      mineStyle: 'default',
    },
  );
  console.log(config);

  function setName(name) {
    const newConfig = structuredClone(config);
    newConfig.name = name;
    setConfig(newConfig);
    updateLocalStorage(newConfig);
  }

  function setMineStyle(mineStyle) {
    const newConfig = structuredClone(config);
    newConfig.mineStyle = mineStyle;
    setConfig(newConfig);
    updateLocalStorage(newConfig);
  }

  return (
    <ConfigContext.Provider
      value={{ config, setName, setMineStyle, setConfig }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
