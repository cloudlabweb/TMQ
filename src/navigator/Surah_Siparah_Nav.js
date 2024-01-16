import { View, Text } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import { COLOR } from '../assets/assets';
import SurahList from '../screens/quranArabic/SurahList';
import SiparahList from '../screens/quranArabic/SiparahList';

const Tab = createMaterialTopTabNavigator();

const Surah_Siparah_Nav = () => {
  return (
<Tab.Navigator initialRouteName='surahListٖٖٖٖ'
screenOptions={{
    tabBarActiveTintColor: COLOR.primary,
    tabBarInactiveTintColor:"rgba(100,80,100,0.5)",
    tabBarLabelStyle:{fontWeight:"600", fontSize:18, marginTop:-1},
    tabBarStyle:{backgroundColor:COLOR.secondary, height:40},
    tabBarPressColor:"yellow",
    // swipeEnabled:false
  }}>
    <Tab.Screen name='surah' component={SurahList}/>
    <Tab.Screen name='chapter' component={SiparahList}/>
</Tab.Navigator>
  )
}

export default Surah_Siparah_Nav