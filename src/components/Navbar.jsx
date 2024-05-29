import {
  Avatar,
  Dropdown,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
} from 'flowbite-react';
import { motion } from 'framer-motion';
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
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={authUser.avatar} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Signed in as
              {' '}
              {authUser.name}
            </span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Link to="/" onClick={signOut}>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Link>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <NavbarCollapse>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
          >
            Home
          </motion.button>
        </Link>
        <Link to="/leaderboard">
          <motion.button
            whileHover={{ scale: 1.1 }}
          >
            Leaderboard
          </motion.button>
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
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default HeaderNavbar;
