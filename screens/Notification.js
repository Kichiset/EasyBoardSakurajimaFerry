import React, { useEffect, useState, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  Animated,
  StatusBar,
  Button,
  Vibration,
  BackHandler,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

const isAndroid = Platform.OS === 'android';

const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');

  // 現在時刻を1秒ごとに更新するタイマーを設定する
  useEffect(() => {
    const getCurrentTime = () => {
      const now = moment().format('HH:mm:ss');
      setCurrentTime(now);
    };

    getCurrentTime();

    const timer = setInterval(() => {
      getCurrentTime();
    }, 1000);

    // タイマーをクリーンアップする
    return () => {
      clearInterval(timer);
    };
  }, []);

{/*タイマーの表示をどうするか？フォアグラウンドでの挙動*/}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

{/*現在時刻の計算（前画面から受けた文字列をUNIX時間に変換したり、日本標準時間に変換したり）*/}
let [counter, setCounter] = useState(0)
let isoDapt = moment().format('YYYY-MM-DD')+ "T" + NextDept + ":00.000Z"; //出航時間を日本時間に変換


let setTempDept = new Date(isoDapt).toISOString();

if (moment(setTempDept) < moment())
     {setTempDept = moment(setTempDept).add(1, 'd')}
let dispTempDept = moment(setTempDept).add(-9, 'h');
setTempDept = moment(setTempDept).add(-9, 'h');
//console.log(setTempDept)

{/*Notificaionに渡す残り時間の計算*/}
const getDeptTime = () => {
if(counter == 0){
  timer = -1;
  } else {
  timer = (moment(setTempDept).add(-counter, 'm')-moment())/1000;
  }
console.log(setTempDept, timer + "秒後に通知",counter)
console.log(moment(setTempDept).add(-counter, 'm').format('HH:mm') +"にお知らせします") //
return(timer)
}

//文字列の表示系
let [message, setMessage] = useState("Select and Set Alarm.")
const getMessage = () => {
  if(counter == 0){
    message = "No message."
  } else if (setDeptTime < 0){
    message = "It's past the scheduled time."
  } else {
    message = "Alart at " + moment(dispTempDept).add(-counter, 'm').format('HH:mm') +"."
  }
  //console.log(message,counter,NextDept,moment(dispTempDept).add(-counter, 'm').format('HH:mm'))
  return (message)
}







{/*Notificaion本体。メッセージ出したり、タイミング調整したり*/}
const scheduleNotificationAsync = async (setTempDept) => {
  await Notifications.scheduleNotificationAsync(
  {
    content: {
      body: 'Ferry Departs after ' + counter + ' min.',
      title: 'Ready to '  + Port +'!!',
      sound: true,
      vibrate: true,
    },
    trigger: {
      seconds: setDeptTime,
    }
  })
}

// 選択した時刻とインデックスを保存
  const [choosenLabel, setChoosenLabel] = useState([0]);
  const [choosenIndex, setChoosenIndex] = useState([0]);

<StatusBar style="auto" />

{/*ここからリターン文（ほとんど表示系）*/}
  return (
  <SafeAreaView style={styles.safeArea}>
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.DepartPortTitle}>To "{Port}"</Text>
      <Text style={styles.DepartPortTitle}>"{currentTime}"</Text>

      {/* ここから、タイマー制御 */}
      <Text style={[styles.buttonText, {color: '#DFAF89'}]}>▼</Text>
      <Text style={[styles.buttonText, {color: '#DFAF89'}]}>Select and Set Alarm.</Text>
      </View>

      <View>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          style={[styles.pickerContainer]}
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}
          
          >
          <Picker.Item label="No message." value="0"/>
          <Picker.Item label="10 min. before" value="10"/>
          <Picker.Item label="15 min. before" value="15"/>
          <Picker.Item label="20 min. before" value="20"/>
          <Picker.Item label="30 min. before" value="30"/>
          <Picker.Item label="45 min. before" value="45"/>
          <Picker.Item label="60 min. before" value="60"/>
        </Picker>
      </View>


      <View style={styles.container}>
      <Text style={[styles.buttonText, {color: '#EBEBEB'}]}>▼</Text>

        {/* セットボタン */}
        <TouchableOpacity
          style={[styles.button, styles.mainButton]}
          onPress={() =>
          {
            setCounter(counter = choosenLabel)
            console.log(counter)
            setDeptTime = getDeptTime();
            setMessage(getMessage(message,counter));
            // No advert ready to show yet
            {/*
            if(loaded && !closed){
              interstitial.show();
            }
            */}
            Notifications.cancelAllScheduledNotificationsAsync();
            scheduleNotificationAsync(setDeptTime)
            // 
          }
        }>
          <Text style={[styles.buttonText]}>Set</Text>
          <Text>{"Short CM will be shown."}</Text>
      </TouchableOpacity>
      
      <Text style={[styles.buttonText, {color: '#DFAF89'}]}>{'\n'}{message}</Text>

      <Text style={styles.buttonText}>▼</Text>
      <Text style={[styles.portTitle, styles.bottomColumn, {color: '#DFAF89'},{textAlign: 'center'}]}>{Port} {'\n'}at {NextDept}</Text>








        

      
      

      {/* 全部リセットするボタン */}
      <TouchableOpacity
        style={[styles.button, styles.mainButton]}
        onPress={() => {
          setCounter(counter = 0)
          Notifications.cancelAllScheduledNotificationsAsync(); // リセットAPI
          //画面リロードを入れる
          //props.navigation.reset(); // リロード
          setCounter(counter = 0);
          setMessage(message = "No message.");
          }
        
        }>
          <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      
      


      {/* 鹿児島港発画面に遷移するボタン */}
      <TouchableOpacity
        style={[styles.button, styles.mainButton]}
        onPress={() => {
          props.navigation.goBack(); // 遷移先の画面名を指定
          }
        
        }>
          <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      
      {/* メイン画面に遷移するボタン */}
      <TouchableOpacity
        style={[styles.button, styles.mainButton, styles.bottomButton]}
        onPress={() => {
          props.navigation.navigate('Main Page'); // 遷移先の画面名を指定
        }}
      >
        <Text style={styles.buttonText}>Main Page</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  </SafeAreaView>
  );
};
export default App;