import React, { useState, useEffect } from 'react';
import { Menu, Icon, Search } from 'semantic-ui-react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import Logout from './Logout';
import userService from '../services/user';

const NavMenu = () => {
  const location = useLocation();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleResultSelect = (event, { result }) => {
    history.push(`/user/${result.id}`);
  };

  const handleSearchChange = (event) => {
    setLoading(true);
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (search) {
      const findUsers = async () => {
        let response = await userService.searchUsers(search);
        response = response.map((user) => {
          const userObj = { ...user, title: user.username, profileimage: user.profileImage };
          delete userObj.profileImage;
          return userObj;
        });
        setSearchResults(response.filter((user) => user.id !== loggedInUser.id));
        setLoading(false);
      };
      findUsers();
    } else if (search === '') {
      setLoading(false);
    }
  }, [search]);

  return (
    <Menu borderless icon fixed='top' id='nav-menu'>
      <Menu.Item fitted='horizontally' position='left' name='logo'>
        <Link to='/' className='navbar-logo'>Huynhstagram</Link>
      </Menu.Item>

      { loggedInUser && (
      <Menu.Item position='left' name='search'>
        <Search
          loading={loading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleSearchChange}
          results={searchResults}
          value={search}
          size='small'
        />
      </Menu.Item>
      )}

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

      <GithubCorner size='100' href='https://github.com/Huynheddie/instagram-clone-frontend' />
      {/* <Menu.Item color='red'>
        GitHub Repo
      </Menu.Item> */}
    </Menu>
  );
};

export default NavMenu;
