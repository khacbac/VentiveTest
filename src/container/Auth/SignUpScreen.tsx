/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputView from '../../components/InputView';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {ThemeColor, useCustomTheme} from '../../hooks/themeHooks';
import {addUserFnc} from '../../redux/auth/action';

const SignUpScreen = () => {
  const {colors} = useCustomTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const s = makeStyles(colors);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const registerUser = () => {
    if (!email || !pass) {
      return;
    }
    dispatch(addUserFnc({email, password: pass}))
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('', err);
      });
  };

  return (
    <View style={s.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}
        scrollEnabled={false}>
        <View style={s.top}>
          <Text style={s.logo}>Ventive Test</Text>
        </View>
        <View style={s.bottom}>
          <Text style={s.title}>Sign-up</Text>
          <View style={s.actionView}>
            <InputView
              label="Email"
              placeholder="Your email id"
              onChangeText={setEmail}
            />
            <InputView
              label="Password"
              placeholder="Password"
              container={{marginTop: 18}}
              secureTextEntry
              onChangeText={setPass}
            />
            <TouchableOpacity
              style={s.loginBtn}
              activeOpacity={0.8}
              onPress={registerUser}>
              <Text style={s.loginTxt}>Signup</Text>
            </TouchableOpacity>
            <Text style={s.signUpDes}>
              I have an account ?{' '}
              <Text style={{color: colors.primary}} onPress={navigation.goBack}>
                Sign-in
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: ThemeColor) =>
  StyleSheet.create({
    container: {flex: 1, backgroundColor: 'rgba(0,0,0,0.05)'},
    top: {
      flex: 1.1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      fontSize: 30,
      fontWeight: '600',
      color: colors.primary,
    },
    bottom: {
      backgroundColor: 'white',
      flex: 3,
      padding: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowOpacity: 0.05,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
    },
    actionView: {
      paddingHorizontal: 15,
      marginTop: 24,
    },
    loginBtn: {
      marginTop: 24,
      backgroundColor: colors.primary,
      borderRadius: 100,
      alignItems: 'center',
      padding: 10,
    },
    loginTxt: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
    signUpDes: {
      color: '#111111',
      fontSize: 14,
      fontWeight: '500',
      alignSelf: 'center',
      marginTop: 12,
    },
  });

export default SignUpScreen;
