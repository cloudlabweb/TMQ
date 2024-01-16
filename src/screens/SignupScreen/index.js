import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState , useEffect } from 'react';
import { styles } from './style';

import MyButton from '../../components/MyButton';
import PhoneInput from '../../components/PhoneInput';
import PasswordInput from '../../components/PasswordInput';
import UserInput from '../../components/UserInput';


import { COLOR } from '../../assets';
import {showMessage} from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import API from '../../services/api'

const SignupScreen = () => {

  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [ isLoading, setLoading ] = useState(false);
  const [ userData, setData ] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('api_token');
          let user = jsonValue != null ? jsonValue : null;
  
          if(user && user != null){
            setData(user)
            navigation.navigate('Notes')
          }
        } catch (e) {
          // Handle error reading value
        }
    }
    
    fetchData();
  }, [userData]);
  

  const SignupFunction = async () => {
    
    setLoading(true)

    API.doRegisterUser(name, number, password, async responseJson => {
      console.log('res',responseJson)
      //return
      if(responseJson.status != 404) {        
        try {

          setLoading(false);
          setNumber('')
          setName('')
          setPassword('')
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

  return (
    <View style={styles.manContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>
          The Majestic <Text style={styles.colorText}>Quran </Text>
        </Text>
        <Text style={styles.text}> A Plain English Translation </Text>
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.loginMainContainer}>
          <Text style={styles.title}>Signup</Text>
          <View style={styles.inputContainer}>
            <UserInput value={name} onChangeText={text => setName(text)} placeholder="Enter Your Name" />
            <PhoneInput value={number} onChangeText={text => setNumber(text)} placeholder="Enter Your Number" />
            <PasswordInput value={password} secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder="Enter Your Password" />
          </View>
          <View style={styles.btn}>
            {isLoading ?
              <ActivityIndicator size='large' color={COLOR.navyBlue} />
              : (
                <MyButton
                  onPress={() => SignupFunction()}
                  Label="Sign Up"
                  textColor={COLOR.white}
                  height={49}
                  width={'70%'}
                  bgColor={COLOR.navyBlue}
                />
              )}
         
          </View>
          <View style={styles.btnContainer}>
            <Text style={styles.noAccountText}>Already have an account?</Text>

            <MyButton
              onPress={() => navigation.navigate('login')}
              Label="Login"
              textColor={COLOR.navyBlue}
              height={40}
              width={'25%'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
