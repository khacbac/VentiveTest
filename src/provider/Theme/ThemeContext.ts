import {createContext} from 'react';
import {Theme} from './ITheme';

export default createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});
