import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import History from '../screens/History';
import Arabic from '../screens/Arabic';
import English from '../screens/English';
import Glossary from '../screens/Glossary';
import { COLOR, FONT } from '../assets';
import SurahwithTrans from '../screens/SurahwithTrans';
const Tab = createMaterialTopTabNavigator();

const TopTabNav = (props) => {
  return (
    <Tab.Navigator initialRouteName='arabic & eng' screenOptions={{
      tabBarActiveTintColor:COLOR.primary,
      tabBarInactiveTintColor:"rgba(100,80,100,0.5)",
      tabBarLabelStyle:{fontFamily:FONT.RobotoBold, margin:0, padding:0, width:"100%"},
      tabBarStyle:{backgroundColor:COLOR.secondary,paddingHorizontal:0, marginBottom:-10},
      tabBarPressColor:"yellow",
      // swipeEnabled:false
    }}>
      <Tab.Screen name='intro' component={History} initialParams={props?.route?.params} />
      <Tab.Screen name='arabic & eng' component={SurahwithTrans} initialParams={props?.route?.params} />
      {/* <Tab.Screen name='arabic' component={Arabic} initialParams={props?.route?.params} /> */}
      {/* <Tab.Screen name='english' component={English} initialParams={props?.route?.params} /> */}
      <Tab.Screen name='glossary' component={Glossary} initialParams={props?.route?.params} /> 
    </Tab.Navigator>
  );
};

export default TopTabNav;
