import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {QuranData} from '../../components/QuranData';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../../assets/assets';
import SearchBarTop from '../../components/SearchBarTop';

const Arabic_Eng_SurahList = () => {
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
      item.surahNameEng
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setQuranData(filteredData);
    } else {
      setQuranData(QuranData);
    }
  };

  return (
    <>
      {/* SEARCH BAR */}
      <SearchBarTop searchHandler={searchHandler} />
      {/* SEARCH BAR */}
      <View style={{flex: 1, backgroundColor: COLOR.primary}}>
        <FlatList
          data={quranData}
          contentContainerStyle={{padding: 8}}
          showsVerticalScrollIndicator={false}
          disableVirtualization={true}
          refreshControl={<RefreshControl refreshing={false} />}
          keyExtractor={item => item.surah_number}
          renderItem={({item, index}) => {
            return (
              <View>
                <View style={styles.dCardContainer}>
                  <Pressable
                    android_ripple={{color: COLOR.secondary, borderless: true}}
                    //style for iOS
                    style={({pressed}) => pressed && styles.pressedItem}
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

                        <Text
                          style={{
                            fontSize: 15,
                            color: '#000',
                            fontFamily: FONT.RobotoRegular,
                          }}>
                          {item?.surahNameMean}
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
    </>
  );
};

export default Arabic_Eng_SurahList;

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
    fontFamily: FONT.RobotoMedium,
    color: COLOR.primary,
  },
  engNameContainer: {
    left: 15,
  },
  engName: {
    fontSize: 22,
    color: COLOR.black,
    fontFamily: FONT.RobotoMedium,
  },
  arabicNameContainer: {
    right: 12,
    position: 'absolute',
    bottom: 20,
  },
  arabicName: {
    fontSize: 32,
    color: COLOR.primary,
    fontFamily: FONT.noorehuda,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
