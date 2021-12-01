import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

const TABBAR_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
const BUTTON_SIZE = 60;
const SPACING = 10;
const CreateNoteBtn = () => {
  const {height, width} = useWindowDimensions();
  const navigation: any = useNavigation();
  const xSnapPoints = [0, -(width - BUTTON_SIZE - SPACING * 2)];
  const ySnapPoints = [0, -(height - TABBAR_HEIGHT - 120)];

  const translateX = React.useRef(useSharedValue(0)).current;
  const translateY = React.useRef(useSharedValue(0)).current;
  const offsetX = React.useRef(useSharedValue(0)).current;
  const offsetY = React.useRef(useSharedValue(0)).current;

  const handler = useAnimatedGestureHandler(
    {
      onStart: _ => {
        translateX.value = offsetX.value;
        translateY.value = offsetY.value;
      },
      onActive: event => {
        translateX.value = event.translationX + offsetX.value;
        translateY.value = Math.min(
          Math.max(event.translationY + offsetY.value, ySnapPoints[1]),
          ySnapPoints[0],
        );
      },
      onEnd: event => {
        translateX.value = withTiming(
          snapPoint(translateX.value, event.velocityY, xSnapPoints),
          {
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            duration: 700,
          },
          isFinish => {
            if (isFinish) {
              offsetX.value = translateX.value;
            }
          },
        );
        offsetY.value = translateY.value;
      },
    },
    [],
  );

  const gotoCreate = () => {
    navigation.navigate('Create');
  };

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: translateY.value},
        {translateX: translateX.value},
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handler}>
      <Animated.View style={[s.container, containerStyle]}>
        <TouchableOpacity
          style={s.btn}
          activeOpacity={0.8}
          onPress={gotoCreate}>
          <Text style={s.text}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: TABBAR_HEIGHT + SPACING,
    backgroundColor: 'orange',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    right: SPACING,
    borderRadius: BUTTON_SIZE / 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
});

export default CreateNoteBtn;
