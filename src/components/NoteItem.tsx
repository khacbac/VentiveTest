/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import {Note} from '../models';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useCustomTheme} from '../hooks/themeHooks';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface IProps {
  onPress?: () => void;
  onFavoritePress: () => void;
  onArchivePress?: () => void;
  item: Note;
}

const NoteItem = ({onPress, item, onFavoritePress, onArchivePress}: IProps) => {
  const {colors} = useCustomTheme();
  const swipeRef = useRef<Swipeable>(null);

  const handleArchivePress = () => {
    swipeRef.current?.close();
    onArchivePress?.();
  };

  const renderRightActions = (
    _: any,
    dragX: Animated.AnimatedInterpolation,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <View style={[s.extraAction]}>
        <Animated.View
          style={[s.extraActionInner, {transform: [{translateX: trans}]}]}>
          <TouchableOpacity
            onPress={handleArchivePress}
            style={[s.extraActionBtn, {backgroundColor: colors.primary}]}>
            <Text style={s.archiveTxt}>Archive</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      enabled={!item.is_archived}>
      <TouchableOpacity
        disabled={item.is_archived}
        style={[
          s.container,
          {
            backgroundColor: colors.card,
            borderColor: item.is_archived ? colors.primary : 'transparent',
          },
        ]}
        activeOpacity={0.8}
        onPress={onPress}>
        <Text style={[{color: colors.text}, s.title]}>{item.title}</Text>
        <Text style={[{color: colors.text}, s.description]}>{item.body}</Text>
        <TouchableOpacity onPress={onFavoritePress} style={s.favoriteBtn}>
          <FontAwesome5
            name={'star'}
            color={item.is_favorite ? colors.primary : colors.gray}
            size={20}
            solid
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

const s = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    opacity: 0.7,
  },
  extraAction: {
    marginLeft: 10,
    height: '100%',
    width: 90,
  },
  extraActionInner: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
  },
  extraActionBtn: {
    width: 80,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  archiveTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  favoriteBtn: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
});

export default NoteItem;
