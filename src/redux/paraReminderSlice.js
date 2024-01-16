import {createSlice} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
  reminderData: [],
};

export const paraReminderSlice = createSlice({
  name: 'paraReminder',
  initialState,
  reducers: {
     reminderSet: (state, action) => {
      state.reminderData = [...state.reminderData, action.payload];

      console.log(state, "************")
    },
    // deleteNote: (state, action) => {
    //   const index = state.reminderData.findIndex(e => e.id === action.payload.id);
    //   const newReminder = [...state.reminderData];
    //   if (index >= 0) {
    //     newReminder.splice(index, 1);
    //   }
    //   state.reminderData = newReminder;
    // },
    reminderUpd: (state, action) => {
      const index = state.reminderData.findIndex(e => e.id === action.payload.id);
      const newReminder = [...state.reminderData];
      if (index >= 0) {
        (newReminder[index].para = action.payload.para),
          (newReminder[index].page = action.payload.page);
          (newReminder[index].line = action.payload.line);
      }
      state.reminderData = newReminder;

      console.log(state, "=======SLICE=======")
    },
  },
});

export const {reminderSet, reminderUpd} = paraReminderSlice.actions;
export const selectReminder = state => state.paraReminder.reminderData;
export const selectReminderWithId = (state, id) =>
  state.paraReminder.reminderData.filter(e => e.id === id);
export default paraReminderSlice.reducer;
