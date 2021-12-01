import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ThemeColor, useCustomTheme} from '../hooks/themeHooks';

interface IProps {
  title: string;
  lestIcon?: string;
  onLeftIconPress?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const Header = (props: IProps) => {
  const {colors} = useCustomTheme();
  const {top} = useSafeAreaInsets();
  const styles = makeStyles(colors, top);

  return (
    <View style={styles.container}>
      {props.lestIcon && (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onLeftIconPress}>
          <FontAwesome5 name={props.lestIcon} color={colors.white} size={20} />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{props.title}</Text>
      {props.rightIcon && (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={props.onRightIconPress}>
          <FontAwesome5 name={props.rightIcon} color={colors.white} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const makeStyles = (colors: ThemeColor, top: number) =>
  StyleSheet.create({
    container: {
      paddingTop: top + 12,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      flex: 1,
      marginLeft: 16,
      color: colors.white,
      fontWeight: '600',
      fontSize: 16,
    },
    btn: {
      paddingHorizontal: 10,
    },
  });

export default Header;
