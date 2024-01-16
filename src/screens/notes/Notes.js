import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR} from '../../assets/assets';
import InputModal from './InputModal';
import NotesContainer from './NotesContainer';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';


import {selectNotes} from '../../redux/noteSlice';
import SearchBarTop from '../../components/SearchBarTop';

import API from '../../services/api'

const Notes = () => {
  const navigation = useNavigation();
  const getNotes = useSelector(selectNotes);
  const [refresh, setRefreshing] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState(getNotes);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('api_token');
      let user = jsonValue != null ? jsonValue : null;

      if(!user && user == null){
          showMessage({
              message: "Please login to save your notes!",
              position: 'top',
              type: "info",
          })
          navigation.navigate('login')
      }else {
          setRefreshing(true)
          getUserNotes()
      }
      //await AsyncStorage.removeItem('api_token');

    } catch (e) {
      // Handle error reading value
    }
  }

  //Update UI after changes in redux state
  useEffect(() => {
    //setNotes([...getNotes]);    
  }, [getNotes]);

  const getUserNotes = () => {

    API.doGetNotes(responseJson => {
      //console.log('get notes +++ >>>' + JSON.stringify(responseJson))
        if(responseJson&&responseJson.status != 404){
            setRefreshing(false)
            setNotes(responseJson.data) 
        } else {
          setRefreshing(false)
          setNotes([]) 
          showMessage({
              message: responseJson.message,
              position: 'top',
              type: "danger",
          });
        }
    });    
  }

  //Data SEARCH
  const searchHandler = value => {
    if (!value.length) {
      console.log('NOTOUND');
      return getUserNotes();
    } else if (value.length !== notes) {
      console.log('NOT FOUND');
    }
    // Data Filteration
    const filteredData = notes.filter(item =>
      item.title.replace(/[^\w\s]/gi, '')
      .replace(/\s/g, '').toLowerCase().includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setNotes(filteredData);
    } else {
      setNotes(notes);
    }
  };

  const onSubmitHandler = (title, description ) => {
    setRefreshing(true)

    API.addNote(title, description, responseJson => {
      //console.log('add notes' + JSON.stringify(responseJson))
        if(responseJson&&responseJson.status != 404){
            setRefreshing(false)
            getUserNotes() 
        } else {
          setRefreshing(false)
          setNotes([]) 
          showMessage({
              message: responseJson.message,
              position: 'top',
              type: "danger",
          });
        }
    });   
  }

  return (
    <View style={styles.main}>
       {/* SEARCH BAR */}
       <SearchBarTop searchHandler={searchHandler} />
      {/* SEARCH BAR */}
      
      <FlatList
        data={notes}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            // onRefresh={null}
            refreshing={refresh}
          />
        }
        renderItem={({item}) => (
          <NotesContainer
            item={item}
            onPress={() => navigation.navigate('noteDetail', {item})}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 8}}
      />

      {/* INPUT MODAL OPENER*/}
      <View style={styles.plusBtnContainer}>
        <TouchableOpacity
          style={styles.plusBtn}
          activeOpacity={0.6}
          onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* INPUT MODAL */}
      <View style={styles.inputModalWrapper}>
        <InputModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={onSubmitHandler}
        />
      </View>
    </View>
  );
};

export default Notes;

// STYLING
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: '#CACACA',
    backgroundColor: COLOR.primary,
  },
  inputModalWrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  plusBtnContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  plusBtn: {
    backgroundColor: COLOR.secondary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
    margin: 20,
  },
});
