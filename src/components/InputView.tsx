import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ThemeColor, useCustomTheme} from '../hooks/themeHooks';

interface IProps extends TextInputProps {
  label: string;
  container?: StyleProp<ViewStyle> | undefined;
}

const InputView = (props: IProps) => {
  const {colors} = useCustomTheme();
  const {top} = useSafeAreaInsets();
  const styles = makeStyles(colors, top);

  return (
    <View style={[styles.container, props.container]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const makeStyles = (colors: ThemeColor, top: number) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.5)',
    },
    label: {
      fontSize: 15,
      fontWeight: '500',
    },
    input: {
      paddingVertical: 10,
      fontSize: 13,
    },
  });

export default InputView;
