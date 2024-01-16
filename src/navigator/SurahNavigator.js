import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const SurahNavigator = () => {
  const navigation = useNavigation();
  return (
    <View>
      {/* Surah Navigator */}
      <View style={styles.surahNavigator}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" style={styles.arrows} size={25} />
        </TouchableOpacity>

        <Text style={{color: '#fff', fontSize: 22}}>Current Surah</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-right" style={styles.arrows} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SurahNavigator;

const styles = StyleSheet.create({
  surahNavigator: {
    backgroundColor: '#000080',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom:5
  },
  arrows: {
    color: '#fff',
  },
});
