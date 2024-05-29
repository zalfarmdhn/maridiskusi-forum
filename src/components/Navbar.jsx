import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from 'flowbite-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';

export function HeaderNavbar({ authUser, signOut }) {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="">
        <GoCommentDiscussion className="self-center text-3xl dark:text-white mx-2" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Maridiskus</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Link to="/" onClick={signOut}>
          <Button>Sign Out</Button>
          <NavbarToggle />
        </Link>
      </div>
      <NavbarCollapse>
        <Link to="/">
          Home
        </Link>
        <Link to="/leaderboard">
          Leaderboard
        </Link>
        <p>
          {authUser && `logged in as ${authUser.name}`}
        </p>
      </NavbarCollapse>
    </Navbar>
  );
}

HeaderNavbar.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default HeaderNavbar;
