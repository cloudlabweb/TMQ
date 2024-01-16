import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../../assets';
import AudioPlayer from '../../components/AudioPlayer';
import {AudioQuranData} from '../../components/AudioQuranData';
import SearchBarTop from '../../components/SearchBarTop';


let ayatIndex = 0
const AudioQuran = () => {
  const navigation = useNavigation();
  const [surahAudio, setSurahAudio] = useState(AudioQuranData);
  const [selectedSurah, setSelectedSurah] = useState();
  const [changeLogic, setChangeLogic] = useState(false);
  const [surahIndex, setSurahIndex] = useState(null);

  useEffect(() => {
    console.log('index',surahIndex)
  }, [surahIndex,changeLogic])

  //Data SEARCH
  const searchHandler = value => {
    if (!value.length) {
      return setSurahAudio(AudioQuranData);
    } else if (value.length !== AudioQuranData) {
      console.log('Data Not Found');
    }
    //Data Filteration
    //replace methode , remove special charaters & space between word
    const filteredData = AudioQuranData.filter(item =>
      item.name
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setSurahAudio(filteredData);
    } else {
      setSurahAudio(AudioQuranData);
    }
  };

  const setNewSurah = (index) => {
    //mockData = []
    //console.log('index to be pushed ------------', surahIndex) 
    
    //ayatIndex = surahIndex + 1;

    //data = props?.testData[ayatIndex]
    //let index = surahIndex + 1
    let getSurahData = AudioQuranData[index]

    console.log('index to be pushed ------------', index) 
    console.log('data to be pushed ------------', getSurahData)
    setSurahIndex(index)
    setSelectedSurah(getSurahData)

  }

  const setPreviousSurah = () => {
    //mockData = []
    ayatIndex = surahIndex - 1;

    let getSurahData = AudioQuranData[ayatIndex]
    //data = props?.testData[ayatIndex]
    console.log('data to be  ------------', getSurahData)
    setSurahIndex(ayatIndex)
    setSelectedSurah(getSurahData)

  }
  
  return (
    <View style={{ flex:1, backgroundColor: '#fff'}}>
      {/* SEARCH BAR */}
      <SearchBarTop searchHandler={searchHandler} />
      {/* SEARCH BAR */}
      <View style={{flex: 1, backgroundColor: COLOR.primary}}>

        {surahAudio ? (
          <FlatList
            data={surahAudio}
            disableVirtualization={true}
            contentContainerStyle={{ padding: 8 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => {
              const MemoizedItem = React.memo(() => (
                <TouchableOpacity
                  onPress={() => {
                    setSurahIndex(index);
                    setSelectedSurah(item);
                    setChangeLogic(true);
                  }}
                  key={index.toString()}
                  activeOpacity={0.7}>
                  <View style={styles.surahContainer}>
                    <Text style={styles.idStyle}>{item.id}.</Text>
                    <Text style={styles.engName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ));

              return <MemoizedItem />;
            }}
          />
          ) : (
            <ActivityIndicator />
        )}
      </View>

      <AudioPlayer
        surahID={surahIndex}
        surahName={selectedSurah?.name}
        qari1={selectedSurah?.qari1}
        qari2={selectedSurah?.qari2}
        qari3={selectedSurah?.qari3}
        qari4={selectedSurah?.qari4}
        increaseAyat={(index) => setNewSurah(index)}
        decreaseAyat={() => setPreviousSurah()}
        changeSurah={changeLogic}
      />
    </View>
  );
};

export default AudioQuran;

// STYLING ====>>>
const styles = StyleSheet.create({
  surahContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  idStyle: {
    fontSize: 20,
    fontFamily: FONT.RobotoMedium,
    color: COLOR.primary,
  },
  engName: {
    fontSize: 22,
    color: COLOR.black,
    fontFamily: FONT.RobotoMedium,
    left: 35,
  },
  pressedItem: {
    opacity: 0.5,
  },
});
