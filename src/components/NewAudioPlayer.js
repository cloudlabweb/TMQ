import { FlatList, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator, PermissionsAndroid } from 'react-native';
import React, { Component, useEffect, useRef, useState } from 'react';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { COLOR,FONT } from '../assets';
import { QuranData } from './QuranData';
// import { selectLanguage } from '../redux/languageSlice'
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import TrackPlayer from 'react-native-track-player';


// let index = 0;
const NewAudioPlayer = (props, navigation) => {

  const [audio, setAudio] = useState(null);
  const [second, setSecond] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [changeLogic, setChangeLogic] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  // const [value, setValue] = useState('qari4');
  const [value, setValue] = useState('Arabic');
  const [audioLink, setAudioLink] = useState('');
  const [audioLangLink, setAudioLangLink] = useState('');
  const [audioLanguages, setAudioLanguages] = useState([]);
  // const getStoreLanguage = useSelector(selectLanguage);
  const [apiLoading, setapiLoading] = useState(false);
  let index = props?.ayatID;



  let sliderEditing = false;
  useEffect(() => {
      getAudio();
  }, [audioLink.length]);
  // }, [props?.qari4, audioLanguages.length]);

  const modalOpener = () => {
    setModalVisible(true);
  };

  // useEffect(() => {
  //   if (apiLoading) {
  //     play();
  //   }
  // }, [apiLoading]);

  const getAudio = async () => {
    //if (props?.ayatID) {
      //index = 0;
      // const response = await fetch(`https://admin.quran4u.com.pk/api/mobile/qirat/${props.ayatID}`).then((response) => response.json());
      // console.log('Audio Data for Ayat ID ' + props.ayatID + ' > ' + JSON.stringify(response.data))
      // // setAudioLanguages(response.data)
      // // secondAudio(response.data[0])
      // setAudioLanguages(response.data)
      //console.log('Audio Block > >>>>>>>>')
      //console.log('heererrerere')

      let link = QuranData[props?.ayatID]
      console.log('heererrerere',props?.ayatID)

      // console.log('heererrerere',link.qari4)
      setAudioLink(link?.qari4)
      //setAudioLink(response.data[0].qari_audio_arabic)      
    // }else {
    //   console.log('heererrerere',props.ayatID)
      
    // }
    // play()
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
    console.log('Getting new id  Audio Block > ',index)
    let link = QuranData[index]

    // const response = await fetch(`https://admin.quran4u.com.pk/api/mobile/qirat/${id}`).then((response) => response.json());
    console.log('Audio Data for Ayat ayatdata ' + link.qari4)
    // setAudioLanguages(response.data)
    // secondAudio(response.data[0])
    setapiLoading(true)
    playAudio(link?.qari4)

    //play()
  };

  const playAudio = (link) => {

    console.log('new props ID', index)

    // return
    Sound.setCategory('Playback');
    setIsLoading(true);
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
          surahTilawat.release();
          console.log('=====>>>', success);
          if (success) {
            index = index + 1
            console.log('new  ID', index)
            if (index < QuranData.length) {
                props.increaseAyat(index);
                getAudioByID();
            }
            // else {
            //     index = QuranData.length - 1
            // }
            setChangeLogic(null);
          }
        });
        setDuration(surahTilawat.getDuration());
        setIsLoading(false);
        setIsPlaying(true);
        setChangeLogic(true);
      },
    );
    console.log('surahtilawat====>>>', surahTilawat);
    setAudio(surahTilawat);
  }

  //Store Languages Audio 
  const secondAudio = (item) => {
    // let storeLang = getStoreLanguage.selectedLanguage;
    // if (storeLang == 'English') {
    //   setAudioLangLink(item?.qari_audio_english)
    //   setAudioLink(item?.qari_audio_arabic)
    //   setValue('English')
    // } else if (storeLang == 'Urdu') {
    //   setAudioLangLink(item?.qari_audio_urdu)
    //   setAudioLink(item?.qari_audio_arabic)
    //   setValue('Urdu')
    // } else if (storeLang == 'Sindhi') {
    //   setAudioLangLink(item?.qari_audio_sindhi)
    //   setAudioLink(item?.qari_audio_arabic)
    //   setValue('Sindhi')
    // } else if (storeLang == 'Pashto') {
    //   setAudioLangLink(item?.qari_audio_pashto)
    //   setAudioLink(item?.qari_audio_arabic)
    //   setValue('Pashto')
    // } else if (storeLang == 'Balochi') {
    //   setAudioLangLink(item?.qari_audio_balochi)
    //   setAudioLink(item?.qari_audio_arabic)
    //   setValue('Balochi')
    // } else {
    //   setAudioLangLink(item?.qari_audio_arabic)
    //   setValue('Arabic')
    // }

    return
    switch (getStoreLanguage.selectedLanguage) {
      case "English":
        return setAudioLink(audioLanguages[0]?.qari_audio_english)
        break;

      case "Urdu":
        return setAudioLink(audioLanguages[0]?.qari_audio_urdu)
        break;

      case "Sindhi":
        return setAudioLink(audioLanguages[0]?.qari_audio_sindhi)
        break;

      case "Pashto":
        return setAudioLink(audioLanguages[0]?.qari_audio_pashto)
        break;

      case "Balochi":
        return setAudioLink(audioLanguages[0]?.qari_audio_balochi)
        break;

      default:
        return setAudioLink(audioLanguages[0]?.qari_audio_arabic)
        break;
    }
  }
  // PLAYER
  // const play = async () => {
  //   if(audioLink) {

  //     Sound.setCategory('Playback');
  //     setIsLoading(true);
  //     // const {config, fs} = RNFetchBlob;
  //     let surahTilawat = new Sound(
  //       audioLink,
  //       undefined,
  //       async(err) => {
  //         if (err) {
  //           console.log('audio', err);
  //           setIsLoading(false);
  //           setChangeLogic(true);
  //           return;
  //         }
  //         surahTilawat.play(success => {
  //           surahTilawat.release();
  //           console.log('=====>>>', success);
  //           if (success && isPlaying) {
  //             //setIsLoading(true);
  //             props.increaseAyat();
  //             index = index + 1;
  //             setTimeout(() => {
  //               getAudioByID();
  //             // playAudio();
  //             },2000)
  //             setChangeLogic(null);
  //           }
  //         });
  //         await fetchAudioDuration(audioLink)
  //         // console.log('>>>>>>>>>>>>' + getAudioDur)
  //         // setDuration(getAudioDur);
  //         setIsLoading(false);
  //         setChangeLogic(true);
  //         setIsPlaying(true);
  //       },
  //     );
  //     console.log('surahtilawat====>>>', surahTilawat);
  //     setAudio(surahTilawat);
  //   }
  // };


  const play = async () => {
    if (audioLink) {
      Sound.setCategory('Playback');
      setIsLoading(true);
  
      try {
        // Fetch audio duration
        //const mp3duration = await fetchAudioDuration(audioLink);
        // console.log('Audio duration:', duration);
  
        // Create a new Sound instance
        let surahTilawat = new Sound(
          audioLink,
          undefined,
          async (err,soundDur) => {
            console.log(soundDur)
            if (err) {
              console.error('Error loading audio:', err);
              setIsLoading(false);
              setChangeLogic(true);
              return;
            }
  
            // Play the audio
            surahTilawat.play((success) => {
              // surahTilawat.release();
              console.log('=====>>>', success);
              if (success) {
                index = index + 1;
                props.increaseAyat(index);
                setTimeout(() => {
                  getAudioByID();
                }, 2000);
                setChangeLogic(null);
              }
            });
  
            // Set the duration
            //setDuration(mp3duration);
            setDuration(surahTilawat.getDuration());

  
            // Update state
            setIsLoading(false);
            setChangeLogic(true);
            setIsPlaying(true);
          },
        );
        console.log('surahtilawat====>>>', surahTilawat);
        setAudio(surahTilawat);
      } catch (error) {
        console.error('Error fetching audio duration:', error);
      }
    }
  };
  

  // Replace this URL with the actual URL where your Node.js API is hosted
  const apiUrl = 'http://37.48.78.191:8085/getDuration';

  const fetchAudioDuration = async (mp3Url) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mp3Url: mp3Url,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error fetching audio duration');
      }
  
      const data = await response.json();
      const duration = data.duration;
  
      console.log('Audio duration:', duration);
      return duration;
    } catch (error) {
      console.error('Error:', error.message);
      return 0;
    }
  }

  
  
  

  const stopTrack = () => {
    audio?.stop();
    // setIsPlaying(false)
    console.log('hit thhis func')
    setChangeLogic(null);
  };

  
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
        if(audio){
          audio?.release();
          stopTrack();
        }
        if(intervalId){
            console.log('play stopped')
            clearInterval(intervalId);
        }
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
    console.log('next ayat', index)
    index = index + 1
    if(index <= QuranData.length){
      
      stopTrack();
      props.increaseAyat(index);
      getAudioByID(); 
    }
    return
    index = index + 1
    if (index < props.ayatData.length) {
      stopTrack();
      props.increaseAyat();
      getAudioByID(props.ayatData[index].ayat_id);
    } else {
      index = props.ayatData.length - 1
    }
  }

  const jumpToPrevious = () => {

    console.log('previous ayat', index)

    if (index > 0) {
      index = index - 1
      stopTrack();
      props.decreaseAyat();
      getAudioByID();
    }
  }


  return (
    <View style={styles.slider_view}>
      <Text style={{
          color: COLOR.primary,
          fontFamily: FONT.RobotoMedium,
          textAlign: 'center',
          fontSize: 18,
        }}>
        {'(' + props?.surahName + ')'}
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
        <TouchableOpacity onPress={() => jumpToPrevious()} activeOpacity={0.7} >
          <AntDesign name="caretleft" size={28} color={COLOR.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => jumpSeconds(-5)} activeOpacity={0.7}>
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
              console.log('funccc')
              setChangeLogic(true);
            }}>
            <AntDesign name={"play"} size={60} color={COLOR.primary} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity onPress={() => jumpSeconds(5)} activeOpacity={0.7}>
          <AntDesign name="forward" size={24} color={COLOR.primary} />
        </TouchableOpacity >
        <TouchableOpacity onPress={() => jumpToNext()} activeOpacity={0.7}>
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

        {/* <TouchableOpacity onPress={modalOpener}>
            <MaterialCommunityIcons
              name="account-voice"
              size={32}
              color={COLOR.primary}
            />
        </TouchableOpacity> */}

        <TouchableOpacity style={{marginLeft: 10 }} onPress={checkPermission}>
          <FontAwesome5 name="download" size={24} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default NewAudioPlayer;

const styles = StyleSheet.create({
  slider_view: {
    //flex: 1,
    height: Dimensions.get('screen').height / 1.8,
    // position:'absolute',
    // bottom: 0,
    //marginTop: -50,
    //width: "100%",
    backgroundColor: COLOR.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    //marginBottom: 36,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
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
})