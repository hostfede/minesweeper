import './navbar.scss';

export function NavBar() {
  return (
    <div className="nav-bar">
      <NavItem url={'/'}>Play!</NavItem>
      <NavItem url={'/records'}>Records</NavItem>
      <NavItem url={'/configuration'}>Configuration</NavItem>
    </div>
  );
}

function NavItem({ url, children }) {
  return (
    <a className="link" href={url}>
      <div className="nav-item">
        <span>{children}</span>
      </div>
    </a>
  );
}
