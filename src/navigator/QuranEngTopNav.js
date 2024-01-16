import { View, Text } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { COLOR } from '../assets/assets';
import EngSurahList from '../screens/englishTrans/EngSurahList';
import EngParaList from '../screens/englishTrans/EngParaList';

const Tab = createMaterialTopTabNavigator();

const QuranEngTopNav = () => {
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
    <Tab.Screen name='surah' component={EngSurahList}/>
    <Tab.Screen name='chapter' component={EngParaList}/>
</Tab.Navigator>
  )
}

export default QuranEngTopNav;