import config from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Gets list of restaurants
 * @param {Function} callback 
 */

async function findUser(number, password, callback) {
  const data = { 
    mobile: number,
    password: password
  }
  fetch(config.domain+'/Signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
  .then((responseJson) => {

    //console.log(responseJson)
      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.findUser=findUser

async function doRegisterUser(name, number, password, callback) {
  const data = { 
    name: name,
    mobile: number,
    password: password
  }

  fetch(config.domain+'/Signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
  .then((responseJson) => {

    //console.log(responseJson)
      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.doRegisterUser=doRegisterUser

async function addNote(title, note, callback) {
  let token = await AsyncStorage.getItem('api_token');

  const data = { 
    titleText: title,
    noteText:  note
  }
  fetch(config.domain+'/Copytextnote', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
  .then((responseJson) => {

      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.addNote=addNote

async function updateNote(id, title, note, callback) {
  let token = await AsyncStorage.getItem('api_token');

  const data = { 
    titleText: title,
    noteText:  note
  }
  fetch(config.domain+`/UpdateNoteText?noteId=${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
  .then((responseJson) => {

      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.updateNote=updateNote


async function doGetNotes( callback) {
  let token = await AsyncStorage.getItem('api_token');
 
  fetch(config.domain+`/getnotes`, {
    method: 'GET',
    headers: {
      'Authorization': token,
    },
  })
  .then((response) => response.json())
    .then((responseJson) => {
      //console.log('>>>>>'+ JSON.stringify(responseJson))

      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.doGetNotes=doGetNotes

async function deleteNote(id, callback) {
  let token = await AsyncStorage.getItem('api_token');
 
  fetch(config.domain+`/DeleteNote?noteId=${id}`, {
    method: 'GET',
    headers: {
      'Authorization': token,
    },
  })
  .then((response) => response.json())
    .then((responseJson) => {
      //console.log('>>>>>'+ JSON.stringify(responseJson))

      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.deleteNote=deleteNote


async function doGetParahList( callback) {
  let token = await AsyncStorage.getItem('api_token');
 
  fetch(config.url+`/para`, {
    method: 'GET'
  })
  .then((response) => response.json())
    .then((responseJson) => {
      //console.log('>>>>>'+ JSON.stringify(responseJson))

      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.doGetParahList=doGetParahList

async function doGetParahByid(name, callback) {
 
  fetch(config.url+`/quranarabic?paraId=${name}`, {
    method: 'GET'
  })
  .then((response) => response.json())
    .then((responseJson) => {
      //console.log('>>>>>'+ JSON.stringify(responseJson))

      if(responseJson)
          callback(responseJson)  
  }).catch(error => {
      console.error(error);
  });
}
exports.doGetParahByid=doGetParahByid
