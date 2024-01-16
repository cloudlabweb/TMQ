import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../../assets';
import {QuranData} from '../../components/QuranData';
import SearchBarTop from '../../components/SearchBarTop';

const SearchWordByWord = props => {
  const navigation = useNavigation();
  const [quranData, setQuranData] = useState();

  //Data SEARCH

  var searchHandler = value => {
    // var timeOut = setTimeout(() => {
      if (!value.length) {
        return setQuranData(QuranData);
      } else {
        console.log('Data Not Found');
      }
    // }, 2500);
    // clearTimeout(timeOut);

    // Data Filteration
    const filteredData = QuranData?.map(item =>
      item?.groups?.filter(e =>
        e?.translation
          ?.replace(/[^\w\s]/gi, '')
          .replace(/\s/g, '')
          .toLowerCase()
          .includes(value.toLowerCase()),
      ),
    );
    if (filteredData.length > 0) {
      setQuranData(filteredData);
    } else {
      setQuranData(QuranData);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLOR.primary}}>
      {/* SEARCH BAR */}
      <SearchBarTop searchHandler={searchHandler} />
      {/* SEARCH BAR */}
      <FlatList
        data={quranData}
        disableVirtualization={true}
        contentContainerStyle={{padding: 8}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return (
            <View>
              
              {item.length > 0 && (
                <FlatList
                  data={item}
                  initialNumToRender={10}
                  keyExtractor={(item, index) => index}
                  key={Math.random()}
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.dCardContainer}>
                        <Pressable
                          android_ripple={{
                            color: COLOR.secondary,
                            borderless: true,
                          }}
                          //style for iOS
                          style={({pressed}) => pressed && styles.pressedItem}
                          //Navigation
                          onPress={() => {
                            navigation.navigate('ReadSearchData', {
                              id: index,
                              data: item,
                            });
                            // console.log(index, '<<<====Index');
                          }}>
                          <View style={styles.paraNameContainer}>
                            <Text style={styles.surahText}>
                              {item.group_no}__ {item.translation}
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                    );
                  }}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default SearchWordByWord;

// STYLING ====>>>
const styles = StyleSheet.create({
  dCardContainer: {
    width: '100%',
    height: 100,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 8,
  },
  paraNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  idStyle: {
    fontSize: 20,
    fontFamily: FONT.RobotoMedium,
    color: COLOR.primary,
  },
  engNameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  surahText: {
    fontSize: 15,
    color: COLOR.black,
    fontFamily: FONT.RobotoRegular,
    textAlign: 'justify',
  },
  pressedItem: {
    opacity: 0.5,
  },
});
