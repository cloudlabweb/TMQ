import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, FONT} from '../../assets';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {selectNotesWithId, deleteNote, editNote} from '../../redux/noteSlice';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';

import API from '../../services/api'

const NoteDetail = props => {
  const navigation = useNavigation();
  const {title, text, _id} = props.route.params.item;
  const [titles, settitles] = useState(title);
  const [desc, setDesc] = useState(text);
  //const notes = useSelector(state => selectNotesWithId(state, id));
  // const dispatch = useDispatch();

  const editNotes = () => {
    
    API.updateNote(_id, titles, desc, responseJson => {
      //console.log('add notes' + JSON.stringify(responseJson))
        if(responseJson&&responseJson.status != 404){
          showMessage({
              message: responseJson.message,
              position: 'top',
              type: "success",
          });
          
          setTimeout(() => {
            props.navigation.goBack();
          },1000)

        } else {
           
          showMessage({
              message: responseJson.message,
              position: 'top',
              type: "danger",
          });
        }
    });
  };
  // DELETE NOTE PERMANENTLY
  const deleteThisNote = () => {
    
    API.deleteNote(_id, responseJson => {
        //console.log('get notes +++ >>>' + JSON.stringify(responseJson))
        if(responseJson&&responseJson.status != 404){
            showMessage({
                message: responseJson.message,
                position: 'top',
                type: "success",
            });

            setTimeout(() => {
              props.navigation.goBack();
            },1000)  

        } else {          
          showMessage({
              message: responseJson.message,
              position: 'top',
              type: "danger",
          });
        }
    });
  }

  // //   DELETE NOTE ALERT
  const deleteAlert = () => {
    Alert.alert(
      'Are you sure?',
      'This action will delete your note permanently!',
      [
        {text: 'Delete', onPress: () => deleteThisNote()},
        {text: 'No thanks', onPress: () => console.log('no thanks')},
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.inputsContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={25} color="#000" />
          </TouchableOpacity>

          {/* Check Button will be Hide if Title & Desc both fields will be Empty */}
          {titles.length == '' || desc.length == '' ? null : (
            <TouchableOpacity activeOpacity={0.6} onPress={editNotes}>
              <FontAwesome5 name="check" size={25} color="#000" />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <TextInput
            value={titles}
            style={styles.notesTitle}
            onChangeText={text => settitles(text)}
          />
          <TextInput
            value={desc}
            style={styles.notesDesc}
            multiline
            onChangeText={text => setDesc(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.deletBtnContainer}>
        <TouchableOpacity
          style={styles.deletBtn}
          activeOpacity={0.6}
          onPress={() => deleteAlert()}>
          <Icon name="cancel" size={55} color="red" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 10,
    flex: 1,
    zIndex: -1,
    paddingTop: 40,
    backgroundColor:"white"
  },
  btnContainer: {
    margin: 10,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notesTitle: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 23,
    fontFamily:FONT.RobotoBold,
    color: COLOR.black,
  },
  notesDesc: {
    top: 15,
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 20,
    fontFamily:FONT.RobotoRegular,
    color: COLOR.black,
    lineHeight:25
  },
  deletBtnContainer: {
    // flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  deletBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: 20,
  },
});
