import React from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';

const NavMenu = () => (
  <Menu borderless fixed='top' style={{ paddingLeft: '20%', paddingRight: '20%' }}>
    <Menu.Item position='left' name='logo' onClick={() => console.log('hi')}>
      <h2 className='navbar-logo'>Huynhstagram</h2>
    </Menu.Item>
    <Menu.Item position='left' name='search'>
      <Input size='small' icon='search' iconPosition='left' placeholder='Search' />
    </Menu.Item>
    <Menu.Item name='home' onClick={() => console.log('hi')}>
      <Icon size='large' name='home' />
    </Menu.Item>
    <Menu.Item name='send' onClick={() => console.log('hi')}>
      <Icon size='large' name='paper plane outline' />
    </Menu.Item>
    <Menu.Item name='explore' onClick={() => console.log('hi')}>
      <Icon size='large' name='compass outline' />
    </Menu.Item>
    <Menu.Item name='notifications' onClick={() => console.log('hi')}>
      <Icon size='large' name='heart outline' />
    </Menu.Item>
  </Menu>
);

export default NavMenu;
