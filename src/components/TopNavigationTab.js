import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import SwitchSelector from "react-native-switch-selector";
import { useNavigation } from '@react-navigation/native';

const options = [
  { label: "History", value: "history" },
  { label: "Arabic", value: "arabic" },
  { label: "English", value: "English" },
  { label: "Glossary", value: "glossary" },
];

const TopNavigationTab = () => {
 

const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
     <SwitchSelector
        options={options}
        initial={1}
        backgroundColor={"#FFBF00"}
        buttonColor={"#fff"}
        textColor={"#fff"}
        selectedColor={"#000080"}
        fontSize={17}
        bold
        onPress={(value) => navigation.navigate(value)}
        // onPress={(value) => navigation.navigate(`value ${value}`)}
        // onPress={(value)=> alert(value)} */}
      /> 
      {/* <TouchableHighlight style={styles.btnBG} onPress={()=>navigation.navigate("history")}>
        <Text style={styles.btnText}>History</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.btnBG} onPress={()=>navigation.navigate("Arabic")}>
        <Text style={styles.btnText}>Arabic</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.btnBG}>
        <Text style={styles.btnText}>English</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor="blue" style={styles.btnBG} >
        <Text style={styles.btnText}>Glossary</Text>
      </TouchableHighlight> */}
    </View>
  )
}

export default TopNavigationTab


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFBF00",
    width: "100%",
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  btnBG: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 50,

  },
  btnText: {
    color: "#000080",
    fontWeight: "800",
    fontSize: 17
  }
})