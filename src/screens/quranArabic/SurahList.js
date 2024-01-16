import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Search from '../../components/Search';
import {QuranData} from '../../components/QuranData';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../../assets/assets';

const SurahList = () => {
  const navigation = useNavigation();
  const [quranData, setQuranData] = useState(QuranData);

  //Data SEARCH
  const searchHandler = value => {
    if (!value.length) {
      return setQuranData(QuranData);
    } else if (value.length !== QuranData) {
      console.log('Data Not Found');
    }
    //Data Filteration
    const filteredData = QuranData.filter(item =>
      item.surahNameEng.toLowerCase().includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setQuranData(filteredData);
    } else {
      setQuranData(QuranData);
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLOR.primary}}>
        <FlatList
          data={quranData}
          contentContainerStyle={{padding: 8}}
          showsVerticalScrollIndicator={false}
          disableVirtualization={true}
          refreshControl={
            <RefreshControl
              // onRefresh={null}
              refreshing={false}
            />
          }
          keyExtractor={item => item.surah_number}
          renderItem={({item, index}) => {
            return (
              <View>
                <View style={styles.dCardContainer}>
                  <Pressable
                    android_ripple={{color: COLOR.secondary, borderless: true}}
                    //style for iOS
                    style={({pressed}) => pressed && styles.pressedItem}
                    //Navigation
                    onPress={() => {
                      navigation.navigate('topTabNav', {id: index, data: item}),
                        console.log(item.surah_number);
                    }}>
                    <View style={styles.paraNameContainer}>
                      <View>
                        <Text style={styles.idStyle}>{item.surah_number}.</Text>
                      </View>

                      <View style={styles.engNameContainer}>
                        <Text style={styles.engName}>
                          {item?.surahNameEng.slice(6)}
                        </Text>
                      </View>

                      <View style={styles.arabicNameContainer}>
                        <Text style={styles.arabicName}>
                          {item?.surah_name.slice(4)}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.searchBox}>
        <Search onSearch={searchHandler} placeholderText="Search Surah" />
      </View>
    </>
  );
};

export default SurahList;

const styles = StyleSheet.create({
  dCardContainer: {
    width: '100%',
    height: 80,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
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
    fontWeight: 'bold',
    color: COLOR.primary,
  },
  engNameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  engName: {
    fontSize: 22,
    color: COLOR.black,
    fontWeight: '600',
    left: 15,
  },
  arabicNameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  arabicName: {
    fontSize: 32,
    color: COLOR.primary,
    fontFamily: FONT.noorehuda,
    bottom: 3,
  },
  pressedItem: {
    opacity: 0.5,
  },
  searchBox: {
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
});
