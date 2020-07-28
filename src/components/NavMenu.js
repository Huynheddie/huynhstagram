import React from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout';

const NavMenu = () => {
  const location = useLocation();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  return (
    <Menu borderless icon fixed='top' id='nav-menu'>
      <Menu.Item fitted='horizontally' position='left' name='logo'>
        <Link to='/' className='navbar-logo'>Huynhstagram</Link>
      </Menu.Item>

      <Menu.Item position='left' name='search'>
        <Input size='small' icon='search' iconPosition='left' placeholder='Search' />
      </Menu.Item>

      <Menu.Item name='HOME'>
        <Link to='/' style={{ color: 'black' }}>
          { location.pathname !== '/'
            ? <Icon size='large' name='list alternate outline' />
            : <Icon size='large' name='list alternate' />}
        </Link>
      </Menu.Item>

      {/* <Menu.Item name='MESSAGES'>
        <Icon size='large' name='paper plane outline' />
      </Menu.Item>

      <Menu.Item name='EXPLORE'>
        <Icon size='large' name='compass outline' />
      </Menu.Item>

      <Menu.Item name='NOTIFICATIONS'>
        <Icon size='large' name='heart outline' />
      </Menu.Item> */}

      <Menu.Item name='NEW POST'>
        <Link to='/post' style={{ color: 'black' }}>
          { location.pathname !== '/post'
            ? <Icon size='large' name='plus square outline' />
            : <Icon size='large' name='plus square' />}
        </Link>
      </Menu.Item>

      <Menu.Item name='PROFILE'>
        <Link to={loggedInUser ? `/user/${loggedInUser.id}` : ''} style={{ color: 'black' }}>
          { location.pathname !== '/user'
            ? <Icon size='large' name='user outline' />
            : <Icon size='large' name='user' />}
        </Link>
      </Menu.Item>

      { loggedInUser && (
      <Menu.Item name='LOGOUT'>
        <Logout />
      </Menu.Item>
      )}

    </Menu>
  );
};

export default NavMenu;
