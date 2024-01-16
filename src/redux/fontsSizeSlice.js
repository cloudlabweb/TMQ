import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  fontsSizes: 24,
  fontSizeArabic: 40,
};

export const fontSizeSlice = createSlice({
  name: 'fontSize',
  initialState,

  reducers: {
    incEngFontSize: (state, action) => {
      state.fontsSizes += 2;
    },
    decEngFontSize: (state, action) => {
      state.fontsSizes -= 2;
    },
    incArabicFontSize: (state, action) => {
      state.fontSizeArabic += 2;
      console.log(state.fontSizeArabic, '----');
    },
    decArabicFontSize: (state, action) => {
      state.fontSizeArabic -= 2;
      console.log(state.fontSizeArabic, '----');
    },
  },
});

export const {
  incEngFontSize,
  decEngFontSize,
  incArabicFontSize,
  decArabicFontSize,
} = fontSizeSlice.actions;
export const selectFontSize = state => state.fontSize.fontsSizes;
export const selectArabicFontSize = state => state.fontSize.fontSizeArabic;
export default fontSizeSlice.reducer;
