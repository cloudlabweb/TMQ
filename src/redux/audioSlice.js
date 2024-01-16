import {createSlice} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
  notes: [],
};

export const audioSlice = createSlice({
  name: 'surahAudio',
  initialState,
  reducers: {
     addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    deleteNote: (state, action) => {
      const index = state.notes.findIndex(e => e.id === action.payload.id);
      const newNote = [...state.notes];
      if (index >= 0) {
        newNote.splice(index, 1);
      }
      state.notes = newNote;
    },
    editNote: (state, action) => {
      const index = state.notes.findIndex(e => e.id === action.payload.id);
      const newNote = [...state.notes];
      if (index >= 0) {
        (newNote[index].title = action.payload.title),
          (newNote[index].description = action.payload.description);
      }
      state.notes = newNote;
    },
  },
});

export const {addNote, deleteNote, editNote, filteredNotes} = noteSlice.actions;
export const selectNotes = state => state.note.notes;
export const selectNotesWithId = (state, id) =>
  state.note.notes.filter(e => e.id === id);
export default noteSlice.reducer;
