import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Header, NoteItem} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {ThemeColor, useCustomTheme} from '../../hooks/themeHooks';
import {Note} from '../../models';
import {archiveNoteFnc, toggleNoteFavoriteFnc} from '../../redux/note/action';
import {selectFavoriteNotes} from '../../redux/note/noteSlice';

const FavoriteScreen = () => {
  const {colors} = useCustomTheme();
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const notes = useAppSelector(selectFavoriteNotes);
  const styles = makeStyles(colors);

  const onItemPress = (note: Note) => () => {
    navigation.navigate('Create', {
      flow: 'EDIT',
      note,
    });
  };

  const onFavoritePress = (item: Note) => () => {
    dispatch(toggleNoteFavoriteFnc(item));
  };
  const onArchivePress = (item: Note) => () => {
    dispatch(archiveNoteFnc(item));
  };

  const renderItem = ({item}: {item: Note}) => {
    return (
      <NoteItem
        onPress={onItemPress(item)}
        item={item}
        onFavoritePress={onFavoritePress(item)}
        onArchivePress={onArchivePress(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Favorties" />
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separate} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const makeStyles = (colors: ThemeColor) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.background},
    list: {
      padding: 15,
    },
    separate: {
      height: 10,
    },
  });

export default FavoriteScreen;
