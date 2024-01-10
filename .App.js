import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Button,Vibration, } from 'react-native';
import * as Notifications from 'expo-notifications';

import MainScreen from './screens/MainScreen';
import KagoshimaDepartureScreen from './screens/KagoshimaDepartureScreen';
import SakurajimaDepartureScreen from './screens/SakurajimaDepartureScreen';
import Notification from './screens/Notification';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    
  }),
});

export default function App() {
  React.useEffect(() => {
    requestPermissionsAsync();
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KagoshimaDepartureScreen">
        <Stack.Screen name="Main Page" component={MainScreen} />
        <Stack.Screen name="Go to Sakurajima(From Kagoshima)" component={KagoshimaDepartureScreen} />
        <Stack.Screen name="Back to Kagoshima(From Sakurajima)" component={SakurajimaDepartureScreen} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const scheduleNotificationAsync = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      body: 'test',
    },
    trigger: {
      seconds: 5,
    }
  })
}

const requestPermissionsAsync = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) { return }

  await Notifications.requestPermissionsAsync();
}
Notifications.setBadgeCountAsync(0);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});


