import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from '../styles/sentMsg';

const Note = ({index, id, text, timestamp, setupEditNote}) => {
  const dispatch = useDispatch();

  const [deleteCountDown, setDeleteCountDown] = useState(1);

  const defaultScale = index === 0 ? 0 : 1;
  const containerScale = useSharedValue(defaultScale);
  const containerOpacity = useSharedValue(1);

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: containerScale.value}],
      opacity: containerOpacity.value,
    };
  });

  const runNoteEffect = () => {
    containerScale.value = withTiming(1, {
      duration: 500,
    });
  };

  const deleteNote = () => {
    containerOpacity.value = withTiming(0, {
      duration: 2000,
    });
    setTimeout(() => {
      dispatch({
        type: 'deleteNote',
        payload: {
          id,
        },
      });
    }, 2000);
  };

  const handleOnPress = () => {
    if (deleteCountDown == 0) {
      deleteNote();
    } else {
      setDeleteCountDown(current => --current);
    }

    let resetCount = setTimeout(() => {
      setDeleteCountDown(1);
    }, 1500);

    if (deleteCountDown == 0) clearTimeout(resetCount);
  };

  useEffect(() => {
    if (index === 0) runNoteEffect();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={handleOnPress}
      onLongPress={setupEditNote.bind(this, id, text)}>
      <Animated.View style={[styles.container, animatedContainerStyles]}>
        <Text style={styles.note}>{text}</Text>

        <View style={styles.footer}>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Note;
