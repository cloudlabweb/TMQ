import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FONT} from '../../assets';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  reminderSet,
  reminderUpd,
  selectReminderWithId,
  selectReminder,
} from '../../redux/paraReminderSlice';

console.log(reminderSet, 'reminderSet');

const ParaReminder = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [paraName, setParaName] = useState('');
  const [pageNum, setPageNum] = useState('');
  const [lineNum, setLineNum] = useState('');

  // REDUX SET & GET DATA
  const id = 786;
  const dispatch = useDispatch();
  const reminderData2 = useSelector(state => selectReminderWithId(state, id));
  const getReminderData = useSelector(selectReminder);
  // =======================
  // const [data, setData] = useState(getReminderData);
  const data = getReminderData.find(e => e);

  const updateReminder = () => {
    dispatch(reminderUpd({id, para: paraName, page: pageNum, line: lineNum}));
  };

  const modalOpener = () => {
    setModalVisible(true);
  };

  const SaveReminder = () => {
    if (reminderData2.length <= 0) {
      dispatch(
        reminderSet({
          id,
          para: paraName,
          page: pageNum,
          line: lineNum,
        }),
      );
    } else {
      updateReminder();
    }
    setModalVisible(false);
  };

  return (
    <>
      <Text style={{color: '#fff', fontFamily: FONT.RobotoBold, fontSize: 20}}>
        Quran Arabic
      </Text>

      <TouchableOpacity onPress={() => modalOpener()}>
        <View style={{right: -117}}>
          <MaterialCommunityIcons
            name="page-previous-outline"
            size={25}
            color={COLOR.white}
          />
        </View>
      </TouchableOpacity>
      {/* MODAL */}
      <Modal
        animationType="fade"
        visible={modalVisible}
        style={{backgroundColor: 'red'}}>
        <View style={styles.modalView}>
          {/* MODAL CLOSER */}
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.modalCloseBtn}>
            <FontAwesome5 name="arrow-left" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.heading}>PARA REMINDER</Text>

          <TextInput
            mode="outlined"
            value={paraName}
            label={reminderData2 == 0 ? 'Para Name' : 'Para: ' + data?.para}
            placeholder="Para Name"
            placeholderTextColor="grey"
            textColor="#000"
            right={<TextInput.Affix text="" />}
            activeOutlineColor={COLOR.primary}
            style={styles.inputStyle}
            onChangeText={e => setParaName(e)}
          />
          <TextInput
            mode="outlined"
            value={pageNum}
            label={reminderData2 == 0 ? 'Page Number' : 'Page # ' + data?.page}
            placeholder="Page Number"
            placeholderTextColor="grey"
            textColor="#000"
            right={<TextInput.Affix text="" />}
            activeOutlineColor={COLOR.primary}
            style={styles.inputStyle}
            onChangeText={e => setPageNum(e)}
            keyboardType={'numeric'}
          />
          <TextInput
            mode="outlined"
            value={lineNum}
            label={reminderData2 == 0 ? 'Line Number' : 'Line # ' + data?.line}
            placeholder="Line Number"
            placeholderTextColor="grey"
            textColor="#000"
            right={<TextInput.Icon text="" />}
            activeOutlineColor={COLOR.primary}
            style={styles.inputStyle}
            onChangeText={e => setLineNum(e)}
            keyboardType={'numeric'}
          />

          {/* Set Reminder Button */}
          <TouchableOpacity
            onPress={SaveReminder}
            style={styles.saveReminderBtn}>
            <FontAwesome5 name="check" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ParaReminder;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  modalCloseBtn: {
    position: 'absolute',
    marginLeft: 15,
    top: 20,
  },
  heading: {
    fontSize: 21,
    color: COLOR.primary,
    fontFamily: FONT.RobotoMedium,
    alignSelf: 'center',
    marginBottom: 25,
  },
  inputStyle: {
    marginBottom: 13,
    backgroundColor: '#fff',
    fontSize: 20,
    textDecorationColor: 'red',
  },
  reminderInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 23,
    fontFamily: FONT.RobotoBold,
    color: COLOR.black,
  },
  saveReminderBtn: {
    // position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 50,
  },
});
