import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {COLOR, FONT} from '../assets';

const BottomTabs = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.bottomTabsContainer}>
      <View style={styles.bottomTabsWraper}>
        <IconComp icon="home" text="Home" comp="home" />
        <IconComp icon="heart" text="Bookmark" comp="bookmark" />
        <IconComp icon="plus" text="Add" comp="Notes" />
        <IconComp icon="headphones" text="Listen" comp="audioQuran" />
        <IconComp icon="search" text="Search" comp="SearchWordByWord" />

        {/*MODAL===>>> */}
        {/* <>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View>
              <Icon name="share" size={27} style={styles.shareIcon} />
              <Text style={{color: 'white'}}>Share</Text>
            </View>
          </TouchableOpacity>

          <Modal visible={modalVisible} animationType="slide">
            <Button title="close" onPress={() => setModalVisible(false)} />
          </Modal>
        </> */}
        {/* <<<===MODAL */}
      </View>
    </View>
  );
};

export default BottomTabs;

const IconComp = props => {
  const navigation = useNavigation();
  var [iconColour, setIconColor] = useState(COLOR.white);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(props.comp);
        }}>
        <View>
          <FontAwesome5 name={props.icon} size={25} style={styles.faIcons} />

          <Text style={styles.iconName}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// STYLING===>>>
const styles = StyleSheet.create({
  bottomTabsContainer: {
    backgroundColor: COLOR.primary,
    // width: '100%',
  },
  bottomTabsWraper: {
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
  shareIcon: {
    marginBottom: 3,
    alignSelf: 'center',
    color: 'white',
  },
  iconName: {
    color: "#fff",
    fontFamily: FONT.RobotoRegular,
  },
  faIcons: {
    marginBottom: 3,
    alignSelf: 'center',
    color: 'white',
  },
});
