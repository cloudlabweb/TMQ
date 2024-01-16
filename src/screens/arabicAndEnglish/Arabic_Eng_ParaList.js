import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import Search from '../../components/Search';
import {Para} from '../../components/QuranData';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../../assets/assets';

const Arabic_Eng_ParaList = () => {
  const navigation = useNavigation();
  const [para, setPara] = useState(Para);

  console.log(para, '==>>>> quran data');

  //Data SEARCH
  const searchHandler = value => {
    if (!value.length) {
      return setPara(Para);
    } else if (value.length !== Para) {
      console.log('Data Not Found');
    }
    //Data Filteration
    const filteredData = Para.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setPara(filteredData);
    } else {
      setPara(Para);
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLOR.primary}}>
        <FlatList
          data={para}
          contentContainerStyle={{padding: 8}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => {
            return (
              <View>
                <View style={styles.dCardContainer}>
                  <Pressable
                    android_ripple={{color: COLOR.secondary, borderless:true}}
                    //style for iOS
                    style={({pressed}) => pressed && styles.pressedItem}

                    //Navigation===>>>
                    onPress={() => {
                      navigation.navigate('paraWithTrans', item.id),
                        console.log(item.id);
                    }}>
                    <View style={styles.paraNameContainer}>
                      <View>
                        <Text style={styles.idStyle}>{item.id}.</Text>
                      </View>

                      <View style={styles.engNameContainer}>
                        <Text style={styles.engName}>{item.name}</Text>
                      </View>

                      <View style={styles.arabicNameContainer}>
                        <Text style={styles.arabicName}>{item.name2}</Text>
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
        <Search onSearch={searchHandler} placeholderText="Search Parah"/>
      </View>
    </>
  );
};

export default Arabic_Eng_ParaList;

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
    fontFamily:FONT.noorehuda,
    bottom:3
  },
  pressedItem: {
    opacity: 0.5,
  },
  searchBox:{
    height:"100%",
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    paddingBottom:5
  }
});