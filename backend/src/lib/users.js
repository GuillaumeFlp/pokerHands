const usersLogged = [];

module.exports = {
  add: (username) => {
    usersLogged.push({ username, hand: [] });
  },
  getUsersLogged: () => usersLogged,
  remove: (username) => {
    const index = usersLogged.indexOf(username);
    if (index !== -1) {
      usersLogged.splice(index, 1);
    }
  },
  setHand: (username, hand) => {
    usersLogged.find((user) => user.username === username).hand = hand;
  }
};
