import './App.scss';
import DifficultySelector from './components/Difficulty/DifficultySelector';
import { GameProvider } from './context/game';
import Header from './components/Header/Header';
import Board from './components/Board/Board';

function App() {
  return (
    <>
      <Header />
      <GameProvider>
        <DifficultySelector />
        <Board />
      </GameProvider>
    </>
  );
}
export default App;
