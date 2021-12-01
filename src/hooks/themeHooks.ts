import {Theme, useTheme} from '@react-navigation/native';

export type ThemeColor = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  white: string;
  yellow: string;
  transparent: string;
  gray: string;
};

export interface CustomTheme extends Theme {
  dark: boolean;
  colors: ThemeColor;
}
export const useCustomTheme = useTheme as () => CustomTheme;
