import React from 'react';
import {Share, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLOR} from '../assets';

const SocialShare = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'SHARE NOTE FILE',
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
    <TouchableOpacity onPress={onShare}>
      <Icon name="share" size={27} color={COLOR.primary} />
    </TouchableOpacity>
  );
};

export default SocialShare;