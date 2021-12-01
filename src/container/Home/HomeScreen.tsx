import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Header, NoteItem} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {ThemeColor, useCustomTheme} from '../../hooks/themeHooks';
import {Note} from '../../models';
import {archiveNoteFnc, toggleNoteFavoriteFnc} from '../../redux/note/action';
import {selectNotes} from '../../redux/note/noteSlice';
import {useNavigation} from '@react-navigation/core';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const {colors} = useCustomTheme();
  const dispatch = useAppDispatch();
  const styles = makeStyles(colors);

  async function getStockInformation(date) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/stocks?date=<date>
    try {
      const data = {
        close: 5642.46,
        date: '23-February-2000',
        high: 6033.98,
        low: 5612.55,
        open: 6002.49,
      };
      return {
        Open: data.open,
        High: data.high,
        Low: data.low,
        Close: data.close,
      };
      // const res = await fetch(
      //   `https://jsonmock.hackerrank.com/api/stocks?date=${date}`,
      // );
      // const jsonRes = await res.json();
      // if (jsonRes.data.length === 0) {
      //   return [];
      // }
      // return jsonRes.data[0];
    } catch (error) {
      return [];
    }
  }

  useEffect(() => {
    getStockInformation('23-February-2000').then(res => {
      console.log('BACHK_____ res : ', res);
    });
  }, []);

  const notes = useAppSelector(selectNotes);

  const gotoSetting = () => {
    navigation.navigate('Setting');
  };

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
      <Header title="Notes" rightIcon="cog" onRightIconPress={gotoSetting} />
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

export default HomeScreen;
