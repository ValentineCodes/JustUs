let initialState = [];

const notesReducer = (state = initialState, action) => {
  if (action.type == 'addNote') {
    return [action.payload, ...state];
  } else if (action.type == 'editNote') {
    let editedState = state.map(note =>
      note.id == action.payload.id
        ? {
            id: note.id,
            text: action.payload.text,
            timestamp: action.payload.timestamp,
          }
        : note,
    );
    let prevNotes = editedState.filter(note => note.id !== action.payload.id);
    let noteEdited = editedState.filter(note => note.id == action.payload.id);
    let newState = [...noteEdited, ...prevNotes];
    return newState;
  } else if (action.type == 'deleteNote') {
    return state.filter(note => note.id !== action.payload.id);
  } else {
    return state;
  }
};

export default notesReducer;
