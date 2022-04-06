import { Link, useLocation } from 'remix';
import logo from '~/images/cleck_badge.png';

const NavItem = ({
  to,
  text,
  selected,
}: {
  to: string;
  text: string;
  selected?: boolean;
}) => (
  <li>
    <Link to={to} className={`${selected ? 'selected' : ''}`}>
      {text}
    </Link>
  </li>
);

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className='wrapper'>
      <header className='header'>
        <Link to='/' className='logo'>
          <img src={logo} />
        </Link>
        <nav className='nav-bar'>
          <ul className='nav-items'>
            <NavItem to='/' text='HOME' selected={pathname === '/'} />
            <NavItem
              to='/fixtures'
              text='FIXTURES'
              selected={pathname === '/fixtures'}
            />
            <NavItem to='/news' text='NEWS' selected={pathname === '/news'} />
            <li>&nbsp;</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
