import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from '../styles/sentMsg';

const SentMsg = ({index, id, text, timestamp}) => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (index === 0) runNoteEffect();
  }, []);

  return (
    <TouchableOpacity>
      <Animated.View style={[styles.container, animatedContainerStyles]}>
        <Text style={styles.note}>{text}</Text>

        <View style={styles.footer}>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SentMsg;
