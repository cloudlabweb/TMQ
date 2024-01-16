import { FlatList, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator, PermissionsAndroid, Modal } from 'react-native';
import React, { Component, useEffect, useRef, useState } from 'react';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { COLOR,FONT } from '../assets';
import {RadioButton} from 'react-native-paper';

// import {  } from './QuranData';
import { AudioQuranData } from './AudioQuranData';
// import { selectLanguage } from '../redux/languageSlice'
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import {showMessage} from 'react-native-flash-message';


const AudioPlayer = (props) => {

  const [audio, setAudio] = useState(null);
  const [second, setSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [changeLogic, setChangeLogic] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('qari4');
  // const [value, setValue] = useState('Arabic');
  const [audioLink, setAudioLink] = useState('');
  const [audioLangLink, setAudioLangLink] = useState('');
  const [audioLanguages, setAudioLanguages] = useState([]);
  // const getStoreLanguage = useSelector(selectLanguage);
  const [apiLoading, setapiLoading] = useState(false);
  let sliderEditing = false;
  // console.log('iddddddd',props?.surahID)
  let index = props?.surahID;


  useEffect(() => {
    console.log('heererrerere', props?.surahName);
  
    if (props?.changeSurah&&props?.surahName) {
      console.log('change surah', value);
      
      if(audio) stopTrack();
        
      
      setQariAudio()
    }
  
    // if (value) {
    //   setQariAudio();
    // }
  }, [props?.changeSurah, props?.surahName, audioLink, value]);
  
  const setQariAudio = () => {
    const qariMap = {
      qari1: props?.qari1,
      qari2: props?.qari2,
      qari3: props?.qari3,
      qari4: props?.qari4,
    };
  
    stopTrack();
    setIsLoading(false);
    setChangeLogic(null)
    setAudioLink(qariMap[value] || props?.qari4);
  };
  
  const modalOpener = () => {
    setModalVisible(true);
  };


  // Download Audio
  const checkPermission = async () => {
    
    if (Platform.OS === 'ios') {
        downloadAudio();
    } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'App need access to your storage to download Surah Tilawat',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('storage permission granted');
            downloadAudio();
          } else {
            alert('Storage Permission Not Granted');
          }
        } catch (error) {
          console.warn(error);
        }
    }
  };

  const downloadAudio = () => {
    let date = new Date();
    let audio_URL = audioLink;
    let ext = getExtention(audio_URL);
    ext = '.' + ext[0];

    // Get config & fs  from RN-fetchBlob
    const { config, fs } = RNFetchBlob;
    // let AudioDir = fs.dirs.DownloadDir + '/TheMajesticQuran.audio';
    let AudioDir = fs.dirs.DownloadDir + '/QuranTranslation.audio';
    console.log('Audio Data > ', audio_URL);
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // related android only
        useDownloadManager: true,
        notification: true,
        path:
          AudioDir +
          `/${props?.surahName}` +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'SurahTilawat',
      },
    };
    config(options)
      .fetch('GET', audio_URL)
      .then(res => {
        console.log('res-->>', JSON.stringify(res));
        alert(`${value} Qirat downloaded successflly`);
      });
  };
  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const getAudioByID = () => {
    console.log('new index >>>>', index);
  
    const link = AudioQuranData[index];
    const selectedQariLink = link[value];
  
    //console.log('Audio Data for Ayat ayatdata ' + selectedQariLink);
  
    setapiLoading(true);
    playAudio(selectedQariLink);
  };
  

  const playAudio = (link) => {

    Sound.setCategory('Playback');
    setIsLoading(true);

    if(audio) {
       audio?.stop();
       audio?.release();     
    }
    // const {config, fs} = RNFetchBlob;
    var surahTilawat = new Sound(
     link,
      undefined,
      (err, soundDur) => {
        console.log(soundDur, 'SOUND');
        if (err) {
          console.log('audio', err);
          setIsLoading(false);
          setChangeLogic(true);
          return;
        }

        surahTilawat.play(success => {
          //surahTilawat.release();
          console.log('=====>>>', success);
          if (success) {
            index = index + 1
            console.log('new  ID', index)
            if (index < AudioQuranData.length) {
              props.increaseAyat(index);
              getAudioByID();
            }
            else {
                index = AudioQuranData.length - 1
            }
            setChangeLogic(null);
          }
        });
        setDuration(surahTilawat.getDuration());
        setIsLoading(false);
        setChangeLogic(true);
      },
    );
    console.log('surahtilawat====>>>', surahTilawat);
    setAudio(surahTilawat);
  }

  const play = async () => {
    console.log(changeLogic);
  
    if (!props?.surahName) {
      showMessage({
        message: 'Please Select Surah Name!',
        position: 'top',
        type: 'danger',
      });
      return;
    }
  
    if (!audioLink) {
      return;
    }
  
    try {
      Sound.setCategory('Playback');
      setIsLoading(true);
  
      const surahTilawat = new Sound(
        audioLink,
        undefined,
        async (err, soundDur) => {
          console.log(soundDur);
  
          if (err) {
            console.error('Error loading audio:', err);
            setIsLoading(false);
            setChangeLogic(true);
            return;
          }
  
          surahTilawat.play(async (success) => {
            console.log('=====>>>', success);
  
            if (success) {
              index = index + 1;
              props.increaseAyat(index);
              setTimeout(() => {
                getAudioByID(index);
              }, 2000);
              setChangeLogic(null);
            }
          });
  
          const duration = await surahTilawat.getDuration();
  
          setDuration(duration);
          setChangeLogic(true);  
          setIsLoading(false);
          setAudio(surahTilawat);
        },
      );
  
      console.log('surahtilawat====>>>', surahTilawat);
    } catch (error) {
      console.error('Error fetching audio duration:', error);
    }
  };
  

  // const play = async () => {
  //   console.log(audioLink);
  //   if(!props?.surahName&&props?.surahName==undefined){
  //     return showMessage({
  //       message: 'Please Select Surah Name!',
  //       position: 'top',
  //       type: "danger",
  //     });
  //   }

  //   if (audioLink) {
  //     Sound.setCategory('Playback');
  //     setIsLoading(true);
  
  //     try {
  
  //       if(audio){
  //           audio?.stop();
  //           audio?.release();
  //       }

  //       // Create a new Sound instance
  //       let surahTilawat = new Sound(
  //         audioLink,
  //         undefined,
  //         async (err,soundDur) => {
  //           console.log(soundDur)
  //           if (err) {
  //             console.error('Error loading audio:', err);
  //             setIsLoading(false);
  //             setChangeLogic(true);
  //             return;
  //           }
  
  //           // Play the audio
  //           surahTilawat.play((success) => {
  //             //surahTilawat.release();
  //             console.log('=====>>>', success);
  //             if (success) {
  //               index = index + 1;
  //               props.increaseAyat(index);
  //               setTimeout(() => {
  //                 getAudioByID();
  //               }, 2000);
  //               setChangeLogic(null);
  //             }
  //           });
  
  //           // Set the duration
  //           setDuration(surahTilawat.getDuration());
  
  //           // Update state
  //           setIsLoading(false);
  //           setChangeLogic(true);
  //           setIsPlaying(true);
  //         },
  //       );
  //       //console.log('surahtilawat====>>>', surahTilawat);
  //       setAudio(surahTilawat);
  //     } catch (error) {
  //         console.error('Error fetching audio duration:', error);
  //     }
  //   }
  // };
  
  
  const stopTrack = () => {
    if(audio){
        audio?.stop();
        audio?.release();
      // setIsPlaying(false)
      console.log('hit thhis func')
      // setChangeLogic(null);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      let intervalId;
  
      if (audio) {
        intervalId = setInterval(() => {
          audio?.getCurrentTime((second, isPlay) => {
            if (isPlay) setSecond(second);
          });
        }, 100);
      }

          
      // STOP-AUDIO when click on any Surah audio or screen unfocused
      // if (isLoading === audioLink) {
      //   stopTrack();
      //   setIsLoading(false);
      // }
  
      // Cleanup interval when the screen is unfocused
      return () => {
        if(audio&&intervalId){
          stopTrack();
          clearInterval(intervalId);
        }
        // if(intervalId){
        //     console.log('play stopped')
        //     clearInterval(intervalId);
        // }
      };
    }, [audio]),
  );
  

  const getAudioTimeString = (seconds) => {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt(seconds % (60 * 60) / 60);
    const s = parseInt(seconds % 60);
    const hs = (h > 0) ? ((h < 10 ? '0' + h : h) + ':') : '';
    return (hs + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
  }

  const jumpSeconds = (secsDelta) => {
    if (audio) {

      audio?.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > duration) nextSecs = duration;
        audio?.setCurrentTime(nextSecs);
        setTimeout(() => {
          setSecond(nextSecs)
        }, 100);
      })
    }
  }

  const onSliderEditing = value => {
    if (audio) {
      // this.sound.pause();
      // console.log(value)
    
      sliderEditing = true;
      audio?.setCurrentTime(value);
      setTimeout(() => {
        sliderEditing = false;
        setSecond(value)
      }, 100);
    }
  }

  const onSliderEditStart = () => {
    sliderEditing = true;
  }

  const onSliderEditEnd = () => {
    sliderEditing = false;
  }

  const jumpToNext = () => {
    if (!props?.surahName && props?.surahName === undefined) {
      return showMessage({
        message: 'Please Select Surah Name!',
        position: 'top',
        type: 'danger',
      });
    }
  
    console.log('next ayat', index);
    index = index + 1;
  
    if (index < AudioQuranData.length) {
      stopTrack();
      props.increaseAyat(index);
      getAudioByID();
    } else {
      showMessage({
        message: 'End of Surah',
        position: 'top',
        type: 'info',
      });
    }
  };
  

  const jumpToPrevious = () => {
    console.log('previous ayat', index)

    if (index > 0) {
      index = index - 1
      stopTrack();
      props.decreaseAyat();
      getAudioByID(index);
    }
  }


  return (
    <View style={styles.slider_view}>
      <Modal animationType="slide" visible={modalVisible}>
         <RadioButton.Group
          onValueChange={newValue => {
            // qari();
            if (newValue === 'qari1') {
              setAudioLink(props?.qari1);
            } else if (newValue === 'qari2') {
              setAudioLink(props?.qari2);
            } else if (newValue === 'qari3') {
              setAudioLink(props?.qari3);
            }else if (newValue === 'qari4') {
              setAudioLink(props?.qari4);
            }
            setValue(newValue);
            setModalVisible(false);
          }}
          value={value}>
          <View
            style={{justifyContent: 'center', alignSelf: 'center', top: 100}}>
            <View style={{margin: 30}}>
              <Text style={styles.qariHeader}>
                Select Qari{' '}
                <MaterialCommunityIcons
                  name="account-voice"
                  size={30}
                  color={COLOR.primary}
                />
               </Text>
             </View>
             <View style={styles.qariWrapper}>
               <RadioButton value="qari1" color={COLOR.primary} />
               <Text style={styles.qariName}>Mishary bin Rashid Alafasy</Text>
             </View>
             <View style={styles.qariWrapper}>
               <RadioButton value="qari2" color={COLOR.primary} />
               <Text style={styles.qariName}>Raad Muhammad Al-Kurdi</Text>
             </View>
             <View style={styles.qariWrapper}>
               <RadioButton value="qari3" color={COLOR.primary} />
               <Text style={styles.qariName}>Abdul Rehman Al-Sudais</Text>
             </View>
             <View style={styles.qariWrapper}>
               <RadioButton value="qari4" color={COLOR.primary} />
               <Text style={styles.qariName}>Abdul Basit</Text>
             </View>
           </View>
         </RadioButton.Group>

         <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeModalBtn}>
          <FontAwesome5 name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
      </Modal>

      <Text style={{
          color: COLOR.primary,
          fontFamily: FONT.RobotoMedium,
          textAlign: 'center',
          fontSize: 18,
        }}>
        {props?.qari4 ? '(' + props?.surahName + ')' : 'Select Surah'}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
        <Text style={styles.slider_time}>{getAudioTimeString(second)} </Text>
        <Slider
          style={styles.slider_style}
          onTouchStart={() => onSliderEditStart()}
          onTouchEnd={() => onSliderEditEnd()}
          maximumValue={duration}
          minimumTrackTintColor={COLOR.primary}
          maximumTrackTintColor={COLOR.oldPrimary}
          thumbTintColor={COLOR.primary}
          onValueChange={(val) => onSliderEditing(val)}
          value={second}
        />
        <Text style={styles.slider_time}>{getAudioTimeString(duration)}</Text>
      </View>

      <View style={{ flexDirection: 'row', width: "80%", justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => jumpToPrevious()} activeOpacity={0.8} >
          <AntDesign name="caretleft" size={28} color={COLOR.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => jumpSeconds(-5)} activeOpacity={0.8}>
          <AntDesign name="banckward" size={24} color={COLOR.primary} />
        </TouchableOpacity>

        {/* PLAY */}
        {isLoading ? (
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            {isLoading && (
              <ActivityIndicator color={COLOR.primary} size={55} />
            )}
          </View>
        ) : changeLogic == null ? (
          <TouchableOpacity onPress={() => {
            play();
          }}
            activeOpacity={0.7}>
            <AntDesign name={"play"} size={60} color={COLOR.primary} />
          </TouchableOpacity>
        ) : null}

        {/* PAUSE */}
        {changeLogic == true ? (
          <TouchableOpacity
            onPress={() => {
              audio?.pause();
              setChangeLogic(false);
            }}>
            <AntDesign name={"pausecircle"} size={60} color={COLOR.primary} />
          </TouchableOpacity>
        ) : null}

        {/* CONTINUE */}
        {changeLogic == false ? (
          <TouchableOpacity
            onPress={() => {
              audio?.play();
              setChangeLogic(true);
            }}>
            <AntDesign name={"play"} size={60} color={COLOR.primary} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity onPress={() => jumpSeconds(5)} activeOpacity={0.8}>
          <AntDesign name="forward" size={24} color={COLOR.primary} />
        </TouchableOpacity >
        <TouchableOpacity onPress={() => jumpToNext()} activeOpacity={0.8}>
          <AntDesign name="caretright" size={28} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          //flex: 0.2,
          flexDirection: 'row',
          //alignSelf: 'flex-end',
          //alignItems: 'flex-end',
          //justifyContent: 'center',
          //bottom: 10,
          //left: 0
          // paddingLeft: 18,
          width: Dimensions.get('window').width - 20,
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>

        <TouchableOpacity onPress={modalOpener}>
            <MaterialCommunityIcons
              name="account-voice"
              size={32}
              color={COLOR.primary}
            />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 10 }} onPress={checkPermission}>
          <FontAwesome5 name="download" size={24} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default AudioPlayer;

const styles = StyleSheet.create({
  slider_view: {
    //flex: 1,
    height: Dimensions.get('screen').height / 4,
    // position:'absolute',
    // bottom: 0,
    //marginTop: -50,
    //width: "100%",
    backgroundColor: COLOR.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    //marginBottom: 36,
    // borderTopLeftRadius:  8,
    // borderTopRightRadius: 8
  },
  slider_style: {
    height: "70%",
    width: Dimensions.get('window').width / 1.6,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  slider_time: {
    fontSize: 15,
    // marginLeft: "1%",
    color: COLOR.primary
  },
  functions_view: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    alignItems: "center"
  },
  qariHeader: {
    fontFamily: FONT.RobotoBold,
    fontSize: 25,
    color: COLOR.primary,
    alignSelf: 'center',
  },
  qariWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  qariName: {
    color: '#000',
    fontSize: 20,
    fontFamily: FONT.RobotoMedium,
    marginLeft: 10,
  },
  closeModalBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 150,
  },
})

