import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Header, NoteItem} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {ThemeColor, useCustomTheme} from '../../hooks/themeHooks';
import {Note} from '../../models';
import {toggleNoteFavoriteFnc} from '../../redux/note/action';
import {selectArchivedNotes} from '../../redux/note/noteSlice';

const ArchiveScreen = () => {
  const dispatch = useAppDispatch();
  const {colors} = useCustomTheme();
  const notes = useAppSelector(selectArchivedNotes);
  const styles = makeStyles(colors);

  const onFavoritePress = (item: Note) => () => {
    dispatch(toggleNoteFavoriteFnc(item));
  };

  const renderItem = ({item}: {item: Note}) => {
    return <NoteItem item={item} onFavoritePress={onFavoritePress(item)} />;
  };

  return (
    <View style={styles.container}>
      <Header title="Archived" />
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

export default ArchiveScreen;
