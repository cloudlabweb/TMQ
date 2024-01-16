import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import noteReducer from "./noteSlice"
import bookmarkReducer from "./bookmarkSlice"
import fontSizeReducer from "./fontsSizeSlice"
import paraReminderReducer from './paraReminderSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, noteReducer);
const persistedReducer2 = persistReducer(persistConfig, bookmarkReducer);
const persistedReducer3 = persistReducer(persistConfig, fontSizeReducer);
const persistedReducer4 = persistReducer(persistConfig, paraReminderReducer);

// Export default through ES6 method
export default () => {
  const store = configureStore({
    reducer: {note: persistedReducer, bookmark: persistedReducer2, fontSize: persistedReducer3, paraReminder: persistedReducer4},

    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });
  let persistor = persistStore(store);
  return {store, persistor};
};
