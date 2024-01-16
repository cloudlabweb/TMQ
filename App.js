import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import reduxStore from './src/redux/Store';
import DrawerNav from './src/navigator/DrawerNav';
import {Provider as PaperProvider} from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const App = () => {
  //Splash Screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {store, persistor} = reduxStore();
  return (
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, <<<===SAFEAREA HIGHT DYNAMIMCALY
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <NavigationContainer theme={theme}>
              <DrawerNav />
              <FlashMessage position="center" />
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
