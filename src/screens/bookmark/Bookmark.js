import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR} from '../../assets/assets';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectBookmark} from '../../redux/bookmarkSlice';
import SearchBarTop from '../../components/SearchBarTop';
import BookmarkContainer from './BookmarkContainer';


const Bookmark = () => {
  const navigation = useNavigation();
  const getBookmark = useSelector(selectBookmark);

  const [bookmark, setBookmark] = useState(getBookmark);


  // const data2 = bookmark.map(e=>e?.surahData);
  // const data = data2.find(e=>e?.groups);
  // const id = bookmark.map(e=>e.id);
const data = bookmark[0]?.surahData
  const id = bookmark[0]?.id;


  //Update UI after changes in redux state
  useEffect(() => {
    setBookmark([...getBookmark]);
  }, [getBookmark]);

  //Data SEARCH
  // const searchHandler = value => {
  //   if (!value.length) {
  //     return setBookmark(getBookmark);
  //   } else if (value.length !== getBookmark) {
  //     console.log('NOT FOUND');
  //   }
  //   // Data Filteration
  //   const filteredData = getBookmark.filter(item =>
  //     item?.translation
  //       .replace(/[^\w\s]/gi, '')
  //       .replace(/\s/g, '')
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  //   );

  //   if (filteredData.length) {
  //     setBookmark(filteredData);
  //   } else {
  //     setBookmark(getBookmark);
  //   }
  // };

  return (
    <View style={styles.main}>
      {/* SEARCH BAR */}
      {/* <SearchBarTop searchHandler={searchHandler} /> */}
      {/* SEARCH BAR */}

      <FlatList
        data={[...bookmark].reverse()}
        // inverted
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 8}}
        renderItem={({item, index}) => (
          // <BookmarkContainer
          //   id={id}
          //   data={data}
          //   item={item}
          //   onPress={() => {
          //     navigation.navigate('topTabNav', {id: id, data: data});
          //     console.log(data.surah_number);
          //   }}
          // />

      //     <BookmarkContainer
      //       item={item}
      //       onPress={() =>{
      //         navigation.navigate('topTabNav', {id: index, data: item.surahData})
      //         console.log( index, "==========>>>>>", data)
      //         }
      //       }
      //     />
      //   )}
      // />
      <View> 
          <BookmarkContainer
            item={item}
            // onPress={() =>{
            //   navigation.navigate('bookmarkDetail', { surah: item.surahNum })
            //   }
            // }
            onPress={() =>{
              navigation.navigate('topTabNav', { bookMark: item.id, surah: item.surahNum, engName: item.surahNameEng, engMean: item.surahNameMean })
              }
            }
          />
      </View>
        
        )}
      />

    </View>
  );
};

export default Bookmark;

// STYLING
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLOR.primary,
  },
});
