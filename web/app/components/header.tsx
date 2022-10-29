import { Link, useLocation } from 'remix';
import logo from '~/images/cleck_badge.png';

const NavItem = ({ to, text, selected, className }: { to: string; text: string; selected?: boolean; className?: string }) => (
  <li className={className || ''}>
    <Link to={to} className={`${selected ? 'selected' : ''}`} prefetch="render">
      {text}
    </Link>
  </li>
);

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="wrapper">
      <header className="header">
        <button className="header-burger"></button>
        <Link to="/" className="logo">
          <img src={logo} />
        </Link>
        <nav className="nav-bar">
          <ul className="nav-items">
            <NavItem to="/" text="HOME" selected={pathname === '/' || pathname.startsWith('/match-centre')} />
            <NavItem to="/fixtures" text="FIXTURES" selected={pathname === '/fixtures'} />
            <NavItem to="/news" text="NEWS" selected={pathname === '/news'} />
            <NavItem className="medium-only" to="/fixtures" text="PLAYERS" selected={pathname === '/players'} />
            <li>&nbsp;</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
