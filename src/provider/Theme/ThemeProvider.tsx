import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {FC, useEffect, useReducer} from 'react';
import {IThemeProps, Theme, ThemeState} from './ITheme';
import ThemeContext from './ThemeContext';

const initialState: ThemeState = {
  theme: 'light',
};

function reducer(state: ThemeState, action: {type: string; theme: Theme}) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
}

const ThemeProvider: FC<IThemeProps> = ({children}) => {
  const {setItem, getItem} = useAsyncStorage('THEME');
  const [state, dispatch] = useReducer(reducer, initialState);
  const {theme} = state;

  useEffect(() => {
    (async () => {
      try {
        const t = (await getItem()) as Theme;
        if (t) {
          setTheme(t);
        }
      } catch (error) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (t: Theme) => {
    dispatch({
      type: 'CHANGE_THEME',
      theme: t,
    });
  };

  const toggleTheme = () => {
    const currentTheme = theme === 'dark' ? 'light' : 'dark';
    setItem(currentTheme);
    setTheme(currentTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
