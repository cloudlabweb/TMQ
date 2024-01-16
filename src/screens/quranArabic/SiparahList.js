import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
  RefreshControl
} from 'react-native';
import React, {useState} from 'react';
import {Para} from '../../components/QuranData';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../../assets';
import SearchBarTop from '../../components/SearchBarTop';
import {showMessage} from 'react-native-flash-message';


import API from '../../services/api'



const SiparahList = () => {
  const navigation = useNavigation();
  const [para, setPara] = useState();
  const [paraFilter, setFilterPara] = useState();

  const [refresh, setRefreshing] = useState(true);
  // const [para, setPara] = useState([]);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {

      API.doGetParahList(responseJson => {
        console.log('get notes +++ >>>' + JSON.stringify(responseJson))
          if(responseJson&&responseJson.length>0){
              setRefreshing(false)
              setPara(responseJson)
              setFilterPara(responseJson) 
          } else {
            setRefreshing(false)
            setPara([]) 
            showMessage({
                message: responseJson.message,
                position: 'top',
                type: "danger",
            });
          }
      });   

    } catch (e) {
      // Handle error reading value
    }
  }

  //Data SEARCH
  const searchHandler = value => {
    if (!value.length) {
      console.log('empty search');
      setFilterPara([]) 
      return para;
    } else if (value.length !== para) {
      setFilterPara([])
      console.log('Data Not Found');
    }
    //Data Filteration
    const filteredData = para.filter(item =>
      item.roman_name
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setFilterPara(filteredData);
    } 
    // else {
    //   setPara(para);
    // }
  };

  return (
    <>
      {/* SEARCH BAR */}
      <SearchBarTop searchHandler={searchHandler} />
      {/* SEARCH BAR */}
      <View style={{flex: 1, backgroundColor: COLOR.primary}}>
        <FlatList
          data={paraFilter&&paraFilter.length>0 ? paraFilter : para}
          contentContainerStyle={{padding: 8}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              // onRefresh={null}
              refreshing={refresh}
            />
          }
          renderItem={({item, index}) => {
            return (
              <View>
                {refresh == false ?
                (<View style={styles.dCardContainer} key={index}>
                  <Pressable
                    android_ripple={{color: COLOR.secondary, borderless: true}}
                    //style for iOS
                    style={({pressed}) => pressed && styles.pressedItem}
                    //Navigation
                    onPress={() => {
                      navigation.navigate('paraArabic', {
                        id: index,
                        data: item,
                        parahList: para
                      });
                      // console.log(item.id);
                    }}>
                    <View style={styles.paraNameContainer}>
                      <View>
                        <Text style={styles.idStyle}>{item.para_number}.</Text>
                      </View>

                      <View style={styles.engNameContainer}>
                        <Text style={styles.engName}>{item.roman_name}</Text>
                      </View>

                      <View style={styles.arabicNameContainer}>
                        <Text style={styles.arabicName}>{item.arabic_name}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>) : null}
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default SiparahList;

// STYLING ====>>>
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
    fontSize: 16,
    fontFamily: FONT.RobotoMedium,
    color: COLOR.primary,
  },
  engNameContainer: {
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  engName: {
    fontSize: Dimensions.get('window').width * 0.050,
    width: Dimensions.get('window').width / 2.2,
    color: COLOR.black,
    fontFamily: FONT.RobotoMedium,
    left: 6,
    textAlign: 'left',
    flexShrink: 1
  },
  arabicNameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  arabicName: {
    fontSize: Dimensions.get('window').width * 0.080,
    color: COLOR.primary,
    fontFamily: FONT.noorehuda,
    top: '-2%',
  },
  pressedItem: {
    opacity: 0.5,
  },
});
