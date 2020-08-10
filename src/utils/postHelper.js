const userOwnedPost = (p) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  if (loggedInUser && loggedInUser.username === p.user.username) {
    return true;
  }
  return false;
};

const shuffle = (arr) => {
  const shuffledArr = arr;
  let x = arr.length;

  while (x >= 1) {
    const index = Math.floor(Math.random() * x);

    x -= 1;

    const temp = shuffledArr[x];
    shuffledArr[x] = shuffledArr[index];
    shuffledArr[index] = temp;
  }
  return shuffledArr;
};

export default { userOwnedPost, shuffle };
