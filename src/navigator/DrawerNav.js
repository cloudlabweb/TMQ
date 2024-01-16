import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import SocialSharing from '../screens/socialSharing/SocialSharing';
import {COLOR} from '../assets';
import BottomTabNav from './BottomTabNav';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import FontSizeSlider from '../components/FontSizeSlider';
import AdmissionForm from '../screens/admissionForm/AdmissionForm';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <Drawer.Navigator
          screenOptions={{
            keyboardDismissMode: 'none',
            drawerStyle: {backgroundColor: COLOR.primary, width: '55%'},
            drawerActiveTintColor: COLOR.secondary,
            drawerInactiveTintColor: COLOR.white,
            drawerPosition: 'left',
            headerShown: false,
            // headerTransparent: true,
            // headerLeft: false,
            // headerRight: () => (
            //   <MaterialCommunityIcons
            //     name="menu"
            //     size={30}
            //     style={{
            //       backgroundColor: COLOR.primary,
            //       borderRadius: 50,
            //       margin: 5,
            //       padding: 5,
            //     }}
            //     color={COLOR.white}
            //     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            //   />
            // ),
          }}>
          <Drawer.Screen
            name="Main"
            component={BottomTabNav}
            options={{headerTitle: ''}}
          />
       
          <Drawer.Group
            screenOptions={{
              headerShown: true,
              headerStyle: {backgroundColor: COLOR.primary},
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerTransparent: false,
            }}>
            <Drawer.Screen name="Social Sharing" component={SocialSharing} />
            <Drawer.Screen name="Admission Form" component={AdmissionForm} />
            <Drawer.Screen name="Font Size" component={FontSizeSlider} />
          </Drawer.Group>
        </Drawer.Navigator>
      </SafeAreaView>
{/* 
      <View
        style={{
          flex: 0.09,
          justifyContent: 'center',
          backgroundColor: COLOR.primary,
        }}>
        <BottomTabs />
      </View> */}
    </>
  );
};
export default DrawerNav;
