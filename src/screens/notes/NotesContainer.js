import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Share,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../assets';
import Icon from 'react-native-vector-icons/FontAwesome';

const formateDate = time => {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  // const hour = date.getHours();
  // const min = date.getMinutes();
  // const sec = date.getSeconds();

  return `${day}/${month}/${year}`;
};

const NotesContainer = ({item, onPress}) => {
  const {title, text} = item;

  const onShare = async () => {
    try {
      const result = await Share.share({
        title:title,
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.notesWrapper}>
      <Pressable
        style={{
          padding: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        android_ripple={{color: COLOR.secondary, borderless: true}}
        onPress={onPress}>
        <View>
          <Text style={styles.notesTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.notesDesc} numberOfLines={3}>
            {text}
          </Text>
          {/* <Text style={styles.notesDate} numberOfLines={1}>
            {`Created at ${formateDate(new Date())}`}
          </Text> */}
        </View>
        <>
          <TouchableOpacity style={{position: "absolute", top: 10,right: 10}} onPress={onShare}>
              <Icon name="share" size={24} color={COLOR.primary} />
          </TouchableOpacity>
        </>
      </Pressable>
    </View>
  );
};

export default NotesContainer;

const styles = StyleSheet.create({
  notesWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    width: '100%',
    flexDirection: 'row',
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLOR.black,
  },
  notesDesc: {
    fontSize: 17,
    marginTop: 5,
    color: '#a1a192',
  },
  notesDate: {
    fontSize: 13,
    marginTop: 5,
    color: 'grey',
  },
});
