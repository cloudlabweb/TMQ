import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    deleteBookmark: (state, action) => {
      const index = state.bookmarks.findIndex(e => e.id === action.payload.id);
      const newBookmark = [...state.bookmarks];
      if (index >= 0) {
        newBookmark.splice(index, 1);
      }
      state.bookmarks = newBookmark;
    },
  },
});

export const {addBookmark, deleteBookmark} = bookmarkSlice.actions;
export const selectBookmark = state => state.bookmark.bookmarks;
export const selectBookmarkWithId = (state, id) =>
  state.bookmark.bookmarks.filter(e => e.id === id);

export default bookmarkSlice.reducer;
