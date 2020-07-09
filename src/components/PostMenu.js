import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const PostMenu = () => (
  <Menu borderless icon text className='post-icon-menu'>
    <Menu.Item>
      <Icon name='heart outline' size='large' style={{ cursor: 'pointer' }} />
    </Menu.Item>
    <Menu.Item>
      <Icon name='comment outline' size='large' style={{ cursor: 'pointer' }} />
    </Menu.Item>
    <Menu.Item>
      <Icon name='paper plane outline' size='large' style={{ cursor: 'pointer' }} />
    </Menu.Item>
    <Menu.Item position='right'>
      <Icon name='bookmark outline' size='large' style={{ cursor: 'pointer' }} />
    </Menu.Item>
  </Menu>
);

export default PostMenu;
