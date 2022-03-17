const initState = {
  theme: '',
  userLogged: null,
  usersLogged: [],
  result: null
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_THEME': {
      return {
        ...state,
        theme: action.data
      };
    }
    case 'UPDATE_USERLOGGED': {
      return {
        ...state,
        userLogged: action.data
      };
    }
    case 'UPDATE_USERSLOGGED': {
      return {
        ...state,
        usersLogged: action.data
      };
    }
    case 'UPDATE_RESULT': {
      return {
        ...state,
        result: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
