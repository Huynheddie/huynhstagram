const userOwnedPost = (p) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  if (loggedInUser.username === p.user.username) {
    return true;
  }
  return false;
};

export default { userOwnedPost };
