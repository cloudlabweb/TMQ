import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLOR, FONT} from '../../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {selectBookmarkWithId, deleteBookmark} from '../../redux/bookmarkSlice';
import {showMessage} from 'react-native-flash-message';

// const BookmarkContainer = ({id, data, item, onPress}) => {
const BookmarkContainer = ({ item, onPress}) => {
  const {id, surahNum, surahName, bookmarkArabic, bookmarkTranslation} = item;
  const notes = useSelector(state => selectBookmarkWithId(state, id));
  const dispatch = useDispatch();

  // DELETE NOTE PERMANENTLY
  const deleteThisBookmark = () => {
    if (notes.length > 0) {
      dispatch(deleteBookmark({id}));
    }
    console.log('<<--Deleted-->>', id);
  };


  return (
    <View style={styles.notesWrapper}>
      <Pressable
        style={{
          paddingBottom: 10,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
        android_ripple={{color: COLOR.secondary, borderless: true}}
        onPress={onPress}>
        <>
          <TouchableOpacity
            onPress={()=>{
              deleteThisBookmark();
              showMessage({
                message: "Bookmark Deleted",
                type: "danger",
              });
            }}
            style={{
              position: 'absolute',
              top: 2,
              left: 0,
              zIndex: 999,
              marginLeft: 3,
            }}>
            <Icon name="cancel" size={33} color="tomato" />
          </TouchableOpacity>
        </>
        <View>
          <Text
            style={[
              styles.notesTitle,
              {alignSelf: 'center', color: COLOR.primary},
            ]}
            numberOfLines={1}>
            {surahNum}.{'        '}
            {surahName}
            {/* {data?.surah_number}.{'        '}
            {data?.surah_name} */}
          </Text>
          <Text style={styles.notesTitle} numberOfLines={1}>
            {bookmarkArabic}
            {/* {item?.arabicText} */}
          </Text>
          <Text style={styles.notesDesc} numberOfLines={1}>
            {bookmarkTranslation}
            {/* {item?.translation} */}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default BookmarkContainer;

const styles = StyleSheet.create({
  notesWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
  },
  notesTitle: {
    fontSize: 25,
    fontFamily: FONT.noorehuda,
    color: COLOR.black,
  },
  notesDesc: {
    fontSize: 18,
    color: 'grey',
  },
});
