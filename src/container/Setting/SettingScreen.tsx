import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Switch} from 'react-native';
import {Header} from '../../components';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {ThemeColor, useCustomTheme} from '../../hooks/themeHooks';
import ThemeContext from '../../provider/Theme/ThemeContext';
import {logout} from '../../redux/auth/authSlice';

const SettingScreen = () => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {colors} = useCustomTheme();
  const styles = makeStyles(colors);
  const {toggleTheme} = useContext(ThemeContext);

  const logOut = () => dispatch(logout());

  return (
    <View style={styles.container}>
      <Header
        title="Setting"
        lestIcon="arrow-left"
        onLeftIconPress={navigation.goBack}
      />
      <TouchableOpacity onPress={toggleTheme} style={styles.btn}>
        <Text style={styles.text}>Dark Theme</Text>
        <Switch
          trackColor={{false: colors.text, true: colors.primary}}
          thumbColor={theme === 'dark' ? colors.yellow : colors.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={theme === 'dark'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={logOut} style={styles.btn}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (colors: ThemeColor) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: colors.card},
    text: {
      color: colors.text,
      fontSize: 18,
      marginRight: 16,
      textTransform: 'capitalize',
      fontWeight: '500',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
  });

export default SettingScreen;
