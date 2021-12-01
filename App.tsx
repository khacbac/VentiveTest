/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/container/Home/HomeScreen';
import FavoriteScreen from './src/container/Favorite/FavoriteScreen';
import ArchiveScreen from './src/container/Archive/ArchiveScreen';
import CreateNoteBtn from './CreateNoteBtn';
import {createStackNavigator} from '@react-navigation/stack';
import CreateScreen from './src/container/Create/CreateScreen';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/store';
import ThemeProvider from './src/provider/Theme/ThemeProvider';
import ThemeContext from './src/provider/Theme/ThemeContext';
import {CustomTheme} from './src/hooks/themeHooks';
import SettingScreen from './src/container/Setting/SettingScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar, View} from 'react-native';
import SignInScreen from './src/container/Auth/SignInScreen';
import SignUpScreen from './src/container/Auth/SignUpScreen';
import {useAppSelector} from './src/hooks/reduxHooks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlaceHolder = () => {
  return <View />;
};

const SystemColor = {
  white: 'white',
  yellow: 'yellow',
  transparent: 'transparent',
  gray: 'gray',
};

const ThemeLight: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    ...SystemColor,
  },
};
const ThemeDark: CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'orange',
    ...SystemColor,
  },
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name={'SignIn'} component={SignInScreen} />
      <Stack.Screen name={'SignUp'} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const LoggedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
      <Stack.Screen name={'Tab'} component={TabStack} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{presentation: 'card'}}
      />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Notes',
            tabBarIcon: (props: {
              focused: boolean;
              color: string;
              size: number;
            }) => (
              <FontAwesome5 name="home" size={props.size} color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: (props: {
              focused: boolean;
              color: string;
              size: number;
            }) => (
              <FontAwesome5
                name="star"
                solid
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Archive"
          component={ArchiveScreen}
          options={{
            tabBarLabel: 'Archived',
            tabBarIcon: (props: {
              focused: boolean;
              color: string;
              size: number;
            }) => (
              <FontAwesome5
                name="archive"
                solid
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={PlaceHolder}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: (props: {
              focused: boolean;
              color: string;
              size: number;
            }) => (
              <FontAwesome5
                name="user"
                solid
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <CreateNoteBtn />
    </>
  );
};

const Navigator = () => {
  const {theme} = useContext(ThemeContext);
  const isLogged = useAppSelector(state => state.auth.isLogged);

  return (
    <NavigationContainer theme={theme === 'dark' ? ThemeDark : ThemeLight}>
      <Stack.Navigator
        screenOptions={{headerShown: false, presentation: 'card'}}>
        {!isLogged && <Stack.Screen name={'AuthStack'} component={AuthStack} />}
        {isLogged && (
          <Stack.Screen name={'LoggedStack'} component={LoggedStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <StatusBar backgroundColor="orange" />
          <Navigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
