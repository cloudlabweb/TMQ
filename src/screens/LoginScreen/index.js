import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import React, { useState , useEffect } from 'react';
import { styles } from './style';

import MyButton from '../../components/MyButton';
import PhoneInput from '../../components/PhoneInput';
import PasswordInput from '../../components/PasswordInput';

import { COLOR } from '../../assets';

import {showMessage} from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import API from '../../services/api'


const LoginScreen = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [ isLoading, setLoading ] = useState(false);
  const [ userData, setData ] = useState({});

  const navigation = useNavigation();


  const LoginFunction = async () => {

    setLoading(true);
    API.findUser(number, password, async responseJson => {
      console.log('res',responseJson)
      //return
      if(responseJson.status != 404) {        
        try {

          setLoading(false);
          setNumber('')
          setPassword('')
          showMessage({
              message: "Login successfully!!",
              position: 'top',
              type: "success",
          })
          setData(responseJson.token)
          await AsyncStorage.setItem('api_token', responseJson.token);

        } catch (e) {
          // saving error
          console.log('error', e);
        }
      } else {

        setLoading(false);
        showMessage({
            message: responseJson.message,
            position: 'top',
            type: "danger",
        });
      }
    });
  }

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //       fetchData();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const fetchData = async () => {
    console.log('eeeeeee')
    try {
      const jsonValue = await AsyncStorage.getItem('api_token');
      let user = jsonValue != null ? jsonValue : null;

      if(user && user != null){
        navigation.navigate('Notes')
      }
    } catch (e) {
      // Handle error reading value
    }
  }

  useEffect(() => {
    
    fetchData();
    
  }, [userData]);

 
  return (
    <View style={styles.manContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          The Majestic <Text style={styles.colorText}>Quran </Text>
        </Text>
        <Text style={styles.text}> A Plain English Translation </Text>
      </View>
      <ScrollView contentContainerStyle={{alignItems:'center'}}>
        <View style={styles.loginMainContainer}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputContainer}>
            <PhoneInput
              value={number}
              onChangeText={text => setNumber(text)}
              placeholder="Enter Your Number"
            />
            <PasswordInput
              value={password}
              placeholder="Enter Your Password"
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.forgetContainer}>
            {/* <Text style={styles.forgetText}>Forget Password</Text> */}
          </View>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={COLOR.navyBlue} />
          ) : (
            <MyButton
              onPress={() => LoginFunction()}
              Label="Login"
              textColor={COLOR.white}
              height={49}
              width={'70%'}
              bgColor={COLOR.navyBlue}
            />
          )}
          
          <View style={styles.btnContainer}>
            <Text style={styles.noAccountText}>Don't have an account?</Text>
            <MyButton
              onPress={() => {
                navigation.navigate('signup');
              }}
              Label="Signup"
              textColor={COLOR.navyBlue}
              height={40}
              width={'30%'}
              fontSize={23}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
