import {View, Text, Image, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from './HomeStyle';
import {ASSETS, COLOR} from '../../assets';
import Header from '../../components/Header';

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.primary,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 15,
        }}>
        <Header />
      </View>

      <View style={styles.centerScreen}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <HomeIcon
              icon={ASSETS.alquran}
              text="Quran Arabic"
              comp="onlyArabic_SiparahList"
            />

            <HomeIcon
              icon={ASSETS.book}
              text="Arabic & English"
              comp="arabic_Eng_surahList"
            />

            <HomeIcon
              icon={ASSETS.translation}
              text="Quran English"
              comp="englishSurahList"
            />

            <HomeIcon
              icon={ASSETS.audio}
              text="Audio Quran"
              comp="audioQuran"
            />

            <HomeIcon
              icon={ASSETS.wordSearch}
              text="Search"
              comp="SearchWordByWord"
              styley={{left: 5}}
            />

            <HomeIcon icon={ASSETS.notes} text="Notes" comp="Notes" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

// HOME ICON COMPONENT
const HomeIcon = prop => {
  const navigation = useNavigation();
  const [isPress, setIsPress] = useState(false);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: 'white',
    style: isPress ? styles.btnPress : styles.btnNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };

  return (
    <View style={styles.dynamicIconComp}>
      <TouchableHighlight
        {...touchProps}
        onPress={() => {
          navigation.navigate(prop.comp);
          console.log(prop.comp);
        }}>
        <View style={styles.iconBG}>
          <Image
            style={{width: 80, height: 80, margin: 10}}
            source={prop.icon}
          />
          <Text style={styles.iconText}>{prop.text}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
