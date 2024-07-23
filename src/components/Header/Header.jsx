import './header.scss';
import { NavBar } from './Navbar/Nav';

function Header() {
  return (
    <header>
      <img src="./images/minesweeper.png" width={200} />
      <NavBar />
    </header>
  );
}

export default Header;
