import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { COLOR } from '../assets/assets';
import Arabic_Eng_SurahList from '../screens/arabicAndEnglish/Arabic_Eng_SurahList';
import Arabic_Eng_ParaList from '../screens/arabicAndEnglish/Arabic_Eng_ParaList';



const Tab = createMaterialTopTabNavigator();

const Arabic_Eng_TopNav = () => {
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
    
    <Tab.Screen name='surah' component={Arabic_Eng_SurahList}/>
    <Tab.Screen name='chapter' component={Arabic_Eng_ParaList}/>
</Tab.Navigator>
  )
}

export default Arabic_Eng_TopNav;