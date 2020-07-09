import React from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

const NavMenu = () => {
  const location = useLocation();

  return (
    <Menu borderless icon fixed='top' style={{ paddingLeft: '20%', paddingRight: '20%' }}>
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
        <Link to='post' style={{ color: 'black' }}>
          { location.pathname !== '/post'
            ? <Icon size='large' name='plus square outline' />
            : <Icon size='large' name='plus square' />}
        </Link>
      </Menu.Item>

      <Menu.Item name='PROFILE'>
        <Link to='/user' style={{ color: 'black' }}>
          { location.pathname !== '/user'
            ? <Icon size='large' name='user outline' />
            : <Icon size='large' name='user' />}
        </Link>
      </Menu.Item>

    </Menu>
  );
};

export default NavMenu;
