let initialState = [];

const msgsReducer = (state = initialState, action) => {
  if (action.type == 'addMsg') {
    return [action.payload, ...state];
  } else {
    return state;
  }
};

export default msgsReducer;
