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

//import { AdsConsent , AdsConsentDebugGeography, AdsConsentStatus} from 'react-native-google-mobile-ads';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    requestPermissionsAsync();
  })
{/*
  const [nonPersonalizedOnly, setNonPersonalizedOnly] = useState(true);

  useEffect(() => {

    AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA,
      testDeviceIdentifiers: ["TEST-DEVICE-HASHED-ID"],
    }).then(async (consentInfo) => {
      let status = consentInfo.status;
      if (
        consentInfo.isConsentFormAvailable &&
        status === AdsConsentStatus.REQUIRED
      ) {
        const result = await AdsConsent.showForm();
        status = result.status;
      }

      if (
        consentInfo.status === AdsConsentStatus.OBTAINED ||
        status === AdsConsentStatus.OBTAINED
      ) {
        setNonPersonalizedOnly(false);
      }
    });
  }, []);
  */}
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
