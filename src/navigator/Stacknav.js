import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLOR, FONT} from '../assets';
// SCREENS
import Home from '../screens/home/Home';
import ListenQuran from './Listen_Quran';
import AudioQuran from '../screens/audioQuran/AudioQuran';
import SocialSharing from '../screens/socialSharing/SocialSharing';
import TopTabNav from './TopTabNav';
import Surah_Siparah_Nav from './Surah_Siparah_Nav';
import QuranEngTopNav from './QuranEngTopNav';
import English from '../screens/English';
import Arabic_Eng_TopNav from './Arabic_Eng_TopNav';
import NoteDetail from '../screens/notes/NoteDetail';
import Notes from '../screens/notes/Notes';
import EngSurahList from '../screens/englishTrans/EngSurahList';
import Arabic_Eng_SurahList from '../screens/arabicAndEnglish/Arabic_Eng_SurahList';
import SiparahList from '../screens/quranArabic/SiparahList';
import ParaArabic from '../screens/quranArabic/ParaArabic';
import BottomTabNav from './BottomTabNav';
import ReadSearchData from '../screens/searchWordByWord/ReadSearchData';
import SearchWordByWord from '../screens/searchWordByWord/SearchWordByWord';
import BookmarkDetail from '../screens/bookmark/BookmarkDetail';
import Bookmark from '../screens/bookmark/Bookmark';
import BottomTabs from '../components/BottomTabs';
import DrawerNav from './DrawerNav';
import ParaReminder from '../screens/quranArabic/ParaReminder';

const Stack = createNativeStackNavigator();

const Title = ({route}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#fff', fontFamily: FONT.RobotoBold, fontSize: 20}}>
        {route?.params?.data ? route?.params?.data?.surahNameEng.slice(6) : route?.params?.engName.slice(6)}
      </Text>
      <Text
        style={{color: '#fff', fontFamily: FONT.RobotoRegular, fontSize: 13}}>
        {route?.params?.data ? route?.params?.data?.surahNameMean : route?.params?.engMean}
      </Text>
    </View>
  );
};

const TitleAr = ({route}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#fff', fontFamily: FONT.RobotoBold, fontSize: 20}}>
        {route?.params?.name.slice(6)}
      </Text>      
    </View>
  );
};




const Stacknav = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animation: 'slide_from_right',
        headerStyle: {backgroundColor: COLOR.primary},
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
      initialRouteName="Home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />

      {/* HOME & Bottom SCREENS */}
      {/* <Stack.Screen name="Notes" component={Notes} /> */}
      <Stack.Screen
        name="audioQuran"
        component={AudioQuran}
        options={{headerTitle: 'Audio Quran'}}
      />
      <Stack.Screen
        name="socialSharing"
        component={SocialSharing}
        options={{headerTitle: 'Social Sharing'}}
      />

      <Stack.Screen
        name="SearchWordByWord"
        component={SearchWordByWord}
        options={{headerTitle: 'Search in translation'}}
      />

      <Stack.Screen
        name="ReadSearchData"
        component={ReadSearchData}
        options={{headerTitle: 'Searched translation'}}
        initialParams={props?.route?.params}
      />

      <Stack.Screen
        name="noteDetail"
        component={NoteDetail}
        options={{headerTitle: 'Note Detail', headerShown: false}}
      />

      <Stack.Screen
        name="bookmark"
        component={Bookmark}
        options={{headerTitle: 'Bookmark', headerShown: false}}
      />

      <Stack.Screen
        name="bookmarkDetail"
        component={BookmarkDetail}
        options={{headerTitle: 'Bookmark Detail', headerShown: false}}
      />
      {/* HOME & Bottom SCREENS  */}

      {/*QURAN ARABIC >>>*/}
      <Stack.Screen
        name="paraArabic"
        component={ParaArabic}
        // Dynamic header
        // options={({route}) => ({
        //   headerTitle:
        //     route.params.data.arabic_name + '        ' + route.params.data.para_number,
        //   headerTitleStyle: {fontFamily: FONT.noorehuda, fontSize: 30},
        // })}
        // initialParams={props?.route?.params}
        options={{headerTitle: 'Bookmark Detail', headerShown: false}}
      />
      <Stack.Screen
        name="onlyArabic_SiparahList"
        component={SiparahList}
        options={{headerTitle: () => <ParaReminder />}}
      />
      {/*QURAN ARABIC >>>*/}

      {/*QURAN ENGLISH >>>*/}
      <Stack.Screen
        name="English"
        component={English}
        options={({route}) => ({
          headerTitle: () => <Title route={route} />,
        })}
      />
      <Stack.Screen
        name="englishSurahList"
        component={EngSurahList}
        options={{headerTitle: 'Quran English'}}
      />
      {/*QURAN ENGLISH >>>*/}

      {/* ARABIC & ENGLISH */}
      <Stack.Screen
        name="arabic_Eng_surahList"
        component={Arabic_Eng_SurahList}
        options={{headerTitle: 'Arabic & English'}}
      />
      {/* ARABIC & ENGLISH */}

      {/* TopTab NAVIGATORS */}
      <Stack.Screen
        name="topTabNav"
        component={TopTabNav}
        options={({route}) => ({
          headerTitle: () => <Title route={route} />,
          headerTitleStyle: {fontFamily: FONT.RobotoBold, fontSize: 20},
        })}
      />
       {/* Listen Audio */}
       <Stack.Screen
        name="listenQuran"
        component={ListenQuran}
        options={{headerTitle: 'Listen Audio Quran'}}
      />
      <Stack.Screen name="surah_Siparah_Nav" component={Surah_Siparah_Nav} />
      <Stack.Screen name="quranEngTopNav" component={QuranEngTopNav} />
      <Stack.Screen name="arabic_Eng_TopNav" component={Arabic_Eng_TopNav} />
      {/* TopTab NAVIGATORS */}

      <Stack.Screen name="DrawerNav" component={DrawerNav} />
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
    </Stack.Navigator>
  );
};

export default Stacknav;
