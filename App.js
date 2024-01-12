import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet,} from 'react-native';
import * as Notifications from 'expo-notifications';

import MainScreen from './screens/MainScreen';
import KagoshimaDepartureScreen from './screens/KagoshimaDepartureScreen';
import KagoshimaAll from './screens/KagoshimaAll';
import SakurajimaDepartureScreen from './screens/SakurajimaDepartureScreen';
import SakurajimaAll from './screens/SakurajimaAll';
import Notification from './screens/Notification';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    requestPermissionsAsync();
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="Main Page" component={MainScreen} />
        <Stack.Screen name="Go to Sakurajima(From Kagoshima)" component={KagoshimaDepartureScreen} />
        <Stack.Screen name="Back to Kagoshima(From Sakurajima)" component={SakurajimaDepartureScreen} />
        <Stack.Screen name="KagoshimaAll" component={KagoshimaAll} />
        <Stack.Screen name="SakurajimaAll" component={SakurajimaAll} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const requestPermissionsAsync = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  //if (granted) { return }

  await Notifications.requestPermissionsAsync();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});
