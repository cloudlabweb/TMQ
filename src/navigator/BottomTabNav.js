import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchWordByWord from '../screens/searchWordByWord/SearchWordByWord';
import Notes from '../screens/notes/Notes';
import Bookmark from '../screens/bookmark/Bookmark';
import Stacknav from './Stacknav';
import DrawerNav from './DrawerNav';
import {COLOR, FONT} from '../assets';
import { View, Dimensions } from 'react-native';

// Auth Screens //
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

const BottomTabNav = props => {
  const navigation = useNavigation();
const {height, width} = Dimensions.get("window")
  return (
    <View style={{height: height/1.035, width, position:"absolute"}}>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // tabBarHideOnKeyboard:true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLOR.primary,
          // flex: 0.08,
          paddingLeft: 5,
        },
        tabBarActiveTintColor: COLOR.secondary,
        tabBarInactiveTintColor: COLOR.white,
      }}>
      <Tab.Screen
        name="Home"              
        component={Stacknav}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="home"
              size={25}
              style={{color: focused ? COLOR.secondary : COLOR.white}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="bookmark"
              size={28}
              style={{color: focused ? COLOR.secondary : COLOR.white}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={28}
              style={{color: focused ? COLOR.secondary : COLOR.white}}
            />
          ),
        }}
      />
      <Tab.Screen
          name="signup"
          component={SignupScreen}
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
      />
      <Tab.Screen
          name="login"
          component={LoginScreen}
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
      />

      <Tab.Screen
        name="Search"
        component={SearchWordByWord}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="search"
              size={25}
              style={{color: focused ? COLOR.secondary : COLOR.white}}
            />
          ),
        }}
        initialParams={props?.route?.params}
      />

      <Tab.Screen
        name="Menu"
        component={DrawerNav}
        options={{
          tabBarShowLabel:false,
          tabBarIcon: ({focused}) => (
            <TouchableOpacity>
              <MaterialCommunityIcons
              name="menu"
              size={28}
              style={{
                color: '#fff',
                padding: 7,
                paddingHorizontal:25,
              }}
              onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
            /> 
          </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
     </View>
  );
};

export default BottomTabNav;
