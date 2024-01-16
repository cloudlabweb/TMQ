import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert} from "react-native";
import {WebView} from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks"; 


const SocialSharing = () => {
  const [playing, setPlaying] = useState(false);
// console.log(useDimensions().window)

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
      //  <WebView
      //     automaticallyAdjustContentInsets={false}
      //     scalesPageToFit={false}
      //     originWhitelist={['*']}
      //     key={Math.random()}
      //     source={{uri:  "https://www.youtube.com/playlist?list=PLKvqnz8z1zWQdc0NSLknxmxBch5gLOqyo"}}
      //   /> 
      <View>
        <YoutubePlayer
           height={"100%"}
           width={"100%"}
           play={playing}
           // videoId={"iee2TATGMyI"}
           webViewStyle={{backgroundColor:"#000", height:"100%"}}
           playList={"PLkbhi9nuIvX6ear96rBZ3jqWXom5Xex3P"}
           onChangeState={onStateChange}
         />
         <Button title={playing ? "pause" : "play"}  onPress={togglePlaying} /> 
    </View>
  )
}

export default SocialSharing