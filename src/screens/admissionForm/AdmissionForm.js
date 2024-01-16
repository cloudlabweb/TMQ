import {View, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import {TextInput, Checkbox, Text, Button} from 'react-native-paper';
import axios from 'axios';
import {COLOR, FONT} from '../../assets';
import {showMessage} from 'react-native-flash-message';

const AdmissionForm = () => {
  // Input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [mobileNum, setMobileNum] = useState();
  const [contactTime, setContactTime] = useState('');
  //   Check Boxes
  const [nazra, setNazra] = useState(false);
  const [hifz, setHifz] = useState(false);
  const [tajweed, setTajweed] = useState(false);
  const [chapterHifz, setChapterHifz] = useState(false);
  const [quranTrans, setQuranTrans] = useState(false);
  // Days Selection
  const [days5, setDays5] = useState(false);
  const [days3, setDays3] = useState(false);
  const [days2, setDays2] = useState(false);

  const first = useRef('');
  //Form Validation & FormData send on Email Addrress
  const sendEmail = async e => {
    if (
      firstName.length <= 2 ||
      contactTime.length <= 0 ||
      countryName.length <= 1
    ) {
      console.log('NOT SUCCESS');
      showMessage({
        message: 'Please fill the all text fields',
        type: 'danger',
      });
    } else if (mobileNum.length <= 4) {
      showMessage({
        message: 'Please enter the valid contact number#',
        type: 'danger',
      });
    } else if (
      nazra === false &&
      hifz === false &&
      tajweed === false &&
      chapterHifz === false &&
      quranTrans === false
    ) {
      showMessage({
        message: 'Select atleast 1 course',
        type: 'danger',
      });
    } else if (days5 === false && days3 === false && days2 === false) {
      showMessage({
        message: 'Please Select class days',
        type: 'danger',
      });
    } else {
      try {
        const payload = {
          service_id: 'service_3vu962m',
          template_id: 'template_h5qas1t',
          user_id: 'i3FXK6-wZh7dQ2FeH', //public Key
          accessToken: 'JxXoIAAlZAQVFc8oCKtdn', //private Key
          template_params: {
            to_name: 'Ahmed Raza',
            from_name: [firstName, lastName],
            country_name: countryName,
            mobile_num: mobileNum,
            course1: nazra ? 'Quran Recitaion (Nazra)' : '',
            course2: hifz ? 'Quran Memorization (Hifz)' : '',
            course3: chapterHifz ? '30 Chapter / Para Hifz' : '',
            course4: quranTrans ? 'Quran Translation' : '',
            course5: tajweed ? 'Tajweed Course' : '',
            class5days: days5 ? '5 days per week class' : '',
            class3days: days3 ? '3 days per week class' : '',
            class2days: days2 ? '2 days per week class' : '',
            contact_you: contactTime,
          },
        };
        const headers = {'Content-Type': 'application/json'};
        const {status} = await axios.post(
          'https://api.emailjs.com/api/v1.0/email/send',
          payload,
          {headers},
        );
        if (status === 200) {
          showMessage({
            message: 'Form Successfully Submitted',
            type: 'success',
          });
          console.log('success');
          // clear input fields onSubmit
          setFirstName('');
          setLastName('');
          setCountryName('');
          setMobileNum(null);
          setContactTime('');
          // clear checkBox onSubmit
          setNazra(false);
          setHifz(false);
          setChapterHifz(false);
          setQuranTrans(false);
          setTajweed(false);
          setDays2(false);
          setDays3(false);
          setDays5(false);
        }
      } catch (error) {
        showMessage({
          message: 'Network error',
          type: 'danger',
        });
        console.log('error in axios Post-->', error);
      }
    }
  };

  return (
    <ScrollView
      style={{flex: 1, padding: 15, backgroundColor: COLOR.white}}
      showsVerticalScrollIndicator={false}>
      <Text style={[styles.heading, {alignSelf: 'center', marginVertical: 20}]}>
        BOOK 3 DAYS FREE TRIAL CLASSES
      </Text>
      <TextInput
        value={firstName}
        mode="outlined"
        label="First Name"
        placeholder="Type here"
        placeholderTextColor="#000"
        textColor="#000"
        right={<TextInput.Affix text="" />}
        activeOutlineColor={COLOR.primary}
        style={styles.inputStyle}
        onChangeText={e => setFirstName(e)}
      />
      <TextInput
        mode="outlined"
        value={lastName}
        label="Last Name"
        placeholder="Type here"
        placeholderTextColor="#000"
        textColor="#000"
        right={<TextInput.Affix text="" />}
        activeOutlineColor={COLOR.primary}
        style={styles.inputStyle}
        onChangeText={e => setLastName(e)}
      />
      <TextInput
        mode="outlined"
        value={countryName}
        label="Country Name"
        placeholder="Type here"
        placeholderTextColor="#000"
        textColor="#000"
        right={<TextInput.Affix text="" />}
        activeOutlineColor={COLOR.primary}
        style={styles.inputStyle}
        onChangeText={e => setCountryName(e)}
      />
      <TextInput
        mode="outlined"
        value={mobileNum}
        label="Mobile/WhatsApp # with country code"
        placeholder="Type here"
        placeholderTextColor="#000"
        textColor="#000"
        right={<TextInput.Affix text="" />}
        activeOutlineColor={COLOR.primary}
        style={styles.inputStyle}
        onChangeText={e => setMobileNum(e)}
        keyboardType={'numeric'}
      />

      <View style={{marginVertical: 20}}>
        <Text style={styles.heading}>Select Course:</Text>

        <Checkbox.Item
          label="Quran Recitaion (Nazra)"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={nazra ? 'checked' : 'unchecked'}
          onPress={e => {
            setNazra(!nazra);
          }}
        />
        <Checkbox.Item
          label="Quran Memorization (Hifz)"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={hifz ? 'checked' : 'unchecked'}
          onPress={() => {
            setHifz(!hifz);
          }}
        />
        <Checkbox.Item
          label="30 Chapter / Para Hifz"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={chapterHifz ? 'checked' : 'unchecked'}
          onPress={() => {
            setChapterHifz(!chapterHifz);
          }}
        />
        <Checkbox.Item
          label="Quran Translation"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={quranTrans ? 'checked' : 'unchecked'}
          onPress={() => {
            setQuranTrans(!quranTrans);
          }}
        />
        <Checkbox.Item
          label="Tajweed Course"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={tajweed ? 'checked' : 'unchecked'}
          onPress={() => {
            setTajweed(!tajweed);
          }}
        />
      </View>
      <View>
        <Text style={styles.heading}>Interested In:</Text>
        <Checkbox.Item
          label="5 days per week class"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={days5 ? 'checked' : 'unchecked'}
          onPress={() => {
            setDays5(!days5);
          }}
        />
        <Checkbox.Item
          label="3 days per week class"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={days3 ? 'checked' : 'unchecked'}
          onPress={() => {
            setDays3(!days3);
          }}
        />
        <Checkbox.Item
          label="2 days per week class"
          labelStyle={styles.checkboxLabel}
          color={COLOR.primary}
          uncheckedColor={COLOR.primary}
          status={days2 ? 'checked' : 'unchecked'}
          onPress={() => {
            setDays2(!days2);
          }}
        />
      </View>

      <TextInput
        mode="outlined"
        value={contactTime}
        label="What is the best time to contact you?"
        placeholder="Type here"
        placeholderTextColor="#000"
        textColor="#000"
        right={<TextInput.Affix text="" />}
        activeOutlineColor={COLOR.primary}
        style={{marginBottom: 40, marginTop: 20, backgroundColor: '#fff'}}
        onChangeText={e => setContactTime(e)}
      />
      <View style={{marginHorizontal: 80, marginBottom: 80, marginTop: 20}}>
        <Button
          mode="contained"
          onPress={sendEmail}
          labelStyle={{fontSize: 20, marginBottom: 7}}
          buttonColor={COLOR.primary}
          textColor="#fff">
          Submit
        </Button>
      </View>
    </ScrollView>
  );
};

export default AdmissionForm;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    color: COLOR.primary,
    fontFamily: FONT.RobotoMedium,
  },
  inputStyle: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  checkboxLabel: {color: COLOR.black},
});
