import './header.scss';
import { NavBar } from './Navbar/Nav';

function Header() {
  return (
    <header>
      <div className="tittle">Minesweeper</div>
      <NavBar />
    </header>
  );
}

export default Header;
