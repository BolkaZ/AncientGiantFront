import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotFoundScreen from '@/app/+not-found';
import GuestScreen from '@/app/(tabs)/guestScreen';
import {store} from '@/logic/store';
import {Provider} from 'react-redux';
import AuthorizationPage from '@/app/(tabs)/authScreen';
import CatalogPage from '@/app/(tabs)/catalogScreen';
import DetailPage from '@/app/(tabs)/DetailsPage';
import {TouchableOpacity} from 'react-native';
import HeaderUserInfo from '@/components/Header';
import BidDetailsPage from '@/app/(tabs)/bidScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store()}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{headerRight: () => (
            <HeaderUserInfo />)}} initialRouteName="Главная">
          <Stack.Screen name='Главная'  component={GuestScreen} />
          <Stack.Screen name='Каталог' component={CatalogPage} />
          <Stack.Screen name='Период' component={DetailPage} />
          <Stack.Screen name='Авторизация' component={AuthorizationPage} />
          <Stack.Screen name={'Заявка'} component={BidDetailsPage} />
          {/*<Stack.Screen name="+not-found" component={NotFoundScreen} />*/}
        </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
    </Provider>
  );
}
