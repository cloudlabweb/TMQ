import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = {
  notes: [],
  // note: {
  //   title: '',
  //   desc: '',
  // },
};

const noteSlice = createSlice({
  name: 'note',
  initialState: initialStateValue,

  reducers: {
    addNote: (state, action) => {
      state.notes = [action.payload, ...state.notes];
    },
    // getNote: (state, action) => {
    //   state.note = [...state.notes, action.payload];
    // },
    // clearNote: (state) => {
    //   state.note = {
    //     title:"",
    //     desc:"",
    //   };
    // },
    // updateNote: (state, action) => {
    //   state.note += action.payload;
    // },
    // deleteNote: (state, action) => {
    //   state.note -= action.payload;
    // },
  },
});
export const selectNotes = state => state.note.notes;

// export const {addNote, getNote, deleteNote, updateNote, clearNote} = noteSlice.actions;
export const {addNote} = noteSlice.actions;
export default noteSlice.reducer;
//>>>>>>>>>>>>>>>>>>>>NOTE SLICE>>>>>>>>>>>>>>>>>>>>>>>>>>



// >>>>>>>>>>>>>>>>>>>>>>>>STORE>>>>>>>>>>>>>>>>>>>>>>>>>>>

import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import noteReducer from './noteSlice';

const reducers = combineReducers({
  note: noteReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whiteList: ['note'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Export default through ES6 method
export default () => {
  const store = configureStore({
    reducer: {note: persistedReducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });
  let persistor = persistStore(store);
  return {store, persistor};
};

// ==========================NOTES FILE DATA===============================>>

// const findNotes = async () => {
//   const result = await AsyncStorage.getItem('notes');
//   if (result !== null) setNotes(JSON.parse(result));
// };

// useEffect(() => {
//   // findNotes();
//   AsyncStorage.clear()
// }, []);

// =======================FLATLIST PAGINATION=========================

  // const [loading, setLoading] = useState(false);
  // const [index, setIndex] = useState(0);
  // const ref = useRef(null);

  // const loader = () => {
  //   return (
  //     <View style={{marginVertical: 16, alignItems: 'center'}}>
  //       {loading ? (
  //         <ActivityIndicator size="large" color={COLOR.primary} />
  //       ) : null}
  //     </View>
  //   );
  // };
  // useEffect(() => {
  //   getData();
  //   // setLoading(true)
  // }, []);

  // const getData = () => {
  //   setQuranData([...QuranData, ...quranData]);
  //   // setLoading(false);
  // };

  <FlatList
          // ref={ref}
          data={quranData}
          initialScrollIndex={surahId}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader}
          // maxToRenderPerBatch={1}
          // onEndReached={getData}
          // onEndReachedThreshold={0.5}
          renderItem={({item, index}) => {
            console.log(index);
            return (
              

                <FlatList
                  data={item.groups}
                  initialScrollIndex={item.surah_number}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return ( )
                  }}
                />
             
            );
          }}
        />