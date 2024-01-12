import React, { useEffect, useState, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking,
  Platform,
  Animated,
  Share
} from 'react-native';
import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
const main_url = 'https://www.amazon.com/dp/B0CKT84HFY';
const sub_url = 'https://onjunpenguin.com/';

// バナー広告用のリンク
const bannerUrls = [
  sub_url,
  'https://sakurajimatsubaki.com/',
  'http://www.sakurajima.gr.jp/svc/topics/post-340.html',
];


// バナー広告用の画像リンク
const bannerImages = [
  require('../assets/GENTOO_PENGUIN_SAKURAJIMA_WORKSHOP.png'),
  require('../assets/SAKURAJIMA_TSUBAKI.png'),
];

// Admobバナー
import { AdmobFullBanner } from "../Admob";

//一行広告のメッセージ（外部リンクをするのは品がないのでやめましょう）
//最大で12文字/sec
const message = ["Tap the planning Ferry! The app notify you.", "Restaurant Sakurajima Close every Monday.", "▼Reccomended Textbook.▼", "▼Please read with waiting Ferry.▼"];

const openLink = (url) => {
  Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
};

const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [holidaysData, setHolidaysData] = useState({});

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



 // 画面遷移する関数
  const goToScreenNotification = () => {
    // `navigation.navigate`で画面遷移し、`userData`をパラメータとして渡す
    navigation.navigate('Notification', {});
  };
  
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // バナー広告の切り替え関数
  const switchBanner = () => {
    setCurrentBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
  };

  // バナー広告の切り替えタイマー
  useEffect(() => {
    const bannerTimer = setInterval(switchBanner, 15 * 1000); // 15秒ごとに切り替え
    return () => clearInterval(bannerTimer); // クリーンアップ
  }, []);
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  // テキスト広告の切り替え関数
  const switchText = () => {
    setCurrentTextIndex(prevIndex => (prevIndex + 1) % message.length);
  };

  // テキスト広告の切り替えタイマー
  useEffect(() => {
    const textTimer = setInterval(switchText, 5000); // 5秒ごとに切り替え
    return () => clearInterval(textTimer); // クリーンアップ
  }, []);
  
  <StatusBar style="auto" />
  
  return (
  <SafeAreaView style={styles.safeArea}>
    <AdmobFullBanner/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentTime}>Current: {currentTime}</Text>
      
      <View style={styles.kagoFrame}>
        
        <Text style={[styles.portTitle, styles.bottomColumn]}>Go to Sakurajima</Text>
        
        <TouchableOpacity
        style={[styles.button, styles.seletTopButton]}
        onPress={() => {
          NextDept = Dept[0]
          //navigation.navigate('Notification',NextDept)
          props.navigation.navigate('Notification',NextDept,Port); // 遷移先の画面名を指定
          console.log(Port, NextDept);
          }}>
          <Text style={styles.nextDeparture}>1st  {Dept[0]}</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity
        style={[styles.button, styles.seletButton]}
        onPress={() => {
          NextDept = Dept[1]
          //navigation.navigate('Notification',NextDept)
          props.navigation.navigate('Notification',NextDept,Port); // 遷移先の画面名を指定
          console.log(Port, NextDept);
          }}>
          <Text style={styles.nextDeparture}>2nd  {Dept[1]}</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity
        style={[styles.button, styles.seletButton]}
        onPress={() => {
          NextDept = Dept[2]
          //navigation.navigate('Notification',NextDept)
          props.navigation.navigate('Notification',NextDept,Port); // 遷移先の画面名を指定
          console.log(Port, NextDept);
          }}>
          <Text style={styles.nextDeparture}>3rd  {Dept[2]}</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity
        style={[styles.button, styles.seletButton]}
        onPress={() => {
          NextDept = Dept[3]
          //navigation.navigate('Notification',NextDept)
          props.navigation.navigate('Notification',NextDept,Port); // 遷移先の画面名を指定
          console.log(Port, NextDept);
          }}>
          <Text style={styles.nextDeparture}>4th  {Dept[3]}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        style={[styles.button, styles.seletButton]}
        onPress={() => {
          NextDept = Dept[4]
          //navigation.navigate('Notification',NextDept)
          props.navigation.navigate('Notification',NextDept,Port); // 遷移先の画面名を指定
          console.log(Port, NextDept);
          }}>
          <Text style={styles.nextDeparture}>5th  {Dept[4]}</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity
        style={[styles.button, styles.seletButton]}
        onPress={() => {
          NextDept = Dept[5]
          //navigation.navigate('Notification',NextDept)
          props.navigation.navigate('Notification',NextDept,Port); // 遷移先の画面名を指定
          console.log(Port, NextDept);
          }}>
          <Text style={styles.nextDeparture}>6th  {Dept[5]}</Text>
        </TouchableOpacity>
          
          
          
          
          
          {/* 鹿児島港から全画面に遷移するボタン（）カレンダーつけにゃならん */}
          {/*
          <TouchableOpacity
            style={[styles.button, styles.sakuraButton]}
            onPress={() => {
            NextDept = Dept[0]
            props.navigation.navigate('SakurajimaAll',Port); // 遷移先の画面名を指定
          }}>
            <Text>Show All Schedule</Text>
          </TouchableOpacity>
          */}
        
      </View>
      
      {/* 桜島港から桜島港画面に遷移するボタン */}
      <TouchableOpacity
        style={[styles.button, styles.kagoButton]}
        onPress={() => {
          props.navigation.navigate('Go to Sakurajima(From Kagoshima)'); // 遷移先の画面名を指定
        }}
      >
        <Text style={styles.buttonText}>Show the Screen{"\n"}Go to "Sakurajima"</Text>
      </TouchableOpacity>
      
      
      <View style={styles.headLineDescription}>
        <Text>▲ Tap the Dept. time, you can set alart. ▲</Text>
      
      </View>


      {/* 桜島港発からメイン画面に遷移するボタン */}
      <TouchableOpacity
        style={[styles.button, styles.mainButton]}
        onPress={() => {
          props.navigation.navigate('Main Page'); // 遷移先の画面名を指定
        }}
      >
        <Text style={styles.buttonText}>Main Page</Text>
      </TouchableOpacity>

        {/*
        <TouchableOpacity onPress={() => openLink(main_url)} style={styles.linkButton}>
          <Image
            source={require('..//assets/桜島の不思議.png')} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
        */}
        <TouchableOpacity onPress={() => openLink(bannerUrls[currentBannerIndex])} style={styles.linkButtonTop}>
          <Image
            source={bannerImages[currentBannerIndex]} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
        
		<Text style={styles.bannerDescription}>▲Reccomendation Items for this Application.▲</Text>
		<Text style={styles.bannerDescription}>▲Please support for SDGs in Sakurajima.▲</Text>

    <AdmobFullBanner />

    </ScrollView>
  </SafeAreaView>
  );
};

export default App;
