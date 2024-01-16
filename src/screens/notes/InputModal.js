import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {COLOR, FONT} from '../../assets';
import {addNote} from '../../redux/noteSlice';

const InputModal = ({visible, onClose, onSubmit}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //const dispatch = useDispatch();

  const id = Date.now();
  const time = Date.now();

  const onChangeTextHandler = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'description') setDescription(text);
  };

  // MODAL (SUBMIT-DATA & CLOSE)
  const submitHandler = () => {
    // if (!title.trim() && !description.trim()) return onClose();
    // console.log("ADD===>>>", title)
    // dispatch(addNote({title, description, id, time}));
    setTitle('');
    setDescription('');
    onClose();
    onSubmit(title, description);
  };

  // RESET MODAL INPUTS
  const closeModal = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <>
      {/* <ScrollView> */}
      {/* INPUT MODAL*/}
      <Modal animationType="fade" visible={visible}>
        <View style={styles.inputsContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <TouchableOpacity
              // style={[styles.checkBtn]}
              activeOpacity={0.6}
              onPress={closeModal}>
              <FontAwesome5 name="arrow-left" size={25} color="#000" />
            </TouchableOpacity>

            {/* Check Button will be appear if Title & Desc both fields have text */}
            {title.trim() && description.trim() ? (
              <TouchableOpacity
                // style={[styles.checkBtn]}
                activeOpacity={0.6}
                onPress={submitHandler}>
                <FontAwesome5 name="check" size={25} color="#000" />
              </TouchableOpacity>
            ) : null}
          </View>

          <TextInput
            placeholder="Title"
            placeholderTextColor={"grey"}
            value={title}
            style={styles.notesTitle}
            onChangeText={text => onChangeTextHandler(text, 'title')}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor={"grey"}
            multiline
            value={description}
            onChangeText={text => onChangeTextHandler(text, 'description')}
            style={styles.notesDesc}
          />
        </View>
      </Modal>
      {/* INPUT MODAL*/}
      {/* // </ScrollView> */}
    </>
  );
};

export default InputModal;

// STYLING

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 10,
    flex: 1,
    zIndex: -1,
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
    // borderBottomColor: 'grey',
    // borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 15,
    top: 15,
    fontFamily:FONT.RobotoRegular,
    fontSize: 18,
    color: COLOR.black,
  },
  checkBtn: {
    backgroundColor: COLOR.secondary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
});
