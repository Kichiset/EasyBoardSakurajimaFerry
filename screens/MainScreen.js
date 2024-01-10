import React, { useEffect, useState, Component } from 'react';
import {
  View, Text, TouchableOpacity, Button, Image, StyleSheet, SafeAreaView, ScrollView, Linking, Platform, Animated, StatusBar, Share
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
  require('../assets/Kenbunroku.png'),
];

//一行広告のメッセージ（外部リンクをするのは品がないのでやめましょう）
//最大で12文字/sec
const message = ["Tap the Destination for the details.", "Restaurant Sakurajima Close every Monday.", "▼Reccomended Textbook.▼", "▼Please read with waiting Ferry.▼"];

const openLink = (url) => {
  Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
};

const peakSeason_prePost = ["2023-08-11", "2023-08-15"];
const peakSeason = ["2023-08-12", "2023-08-13", "2023-08-14"];
const tempSchedule=["2023-11-02","2023-11-04","2023-11-05","2023-11-11","2023-11-12","2023-12-03","2023-12-09","2023-12-10","2023-12-16","2023-12-17"];


const isWeekEnd = moment().format('d') % 6 == 0 ? true : false;

// 桜島港と鹿児島港の平日と土日祝日の出発時刻データ
import ferryTimetable from '../timeTable.json';

// 出発時刻の探索関数 (先発と次発を探す)
const getNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  return nextDepartureTime || schedule[0]; // 最終便が終わった場合は翌日の最初の便を表示
};

// 次の次の出発時刻を探す関数
const getFollowingDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const nextDepartureTime = schedule.find(time => moment(time, 'HH:mm') > currentMoment);
  const followingDepartureTime  = schedule.find(time => moment(time, 'HH:mm') > moment(nextDepartureTime, 'HH:mm'));
  return followingDepartureTime  || schedule[1]; // 最終便が終わった場合は翌日の2番目の便を表示
};

// 時刻表を現在時刻を基準に並び替える関数
const sortSchedule = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  const todaySchedule = schedule.filter(time => moment(time, 'HH:mm') >= currentMoment);
  const nextDaySchedule = schedule.filter(time => moment(time, 'HH:mm') < currentMoment);

  return [...todaySchedule, ...nextDaySchedule];
};

const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [followingDepartureSakurajima, setFollowingDepartureSakurajima] = useState('');
  const [followingDepartureKagoshima, setFollowingDepartureKagoshima] = useState('');
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

  // 祝日の判定を行うタイマーと初回のAPIリクエストを設定する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setHolidaysData(response.data);
      } catch (error) {
        console.error('Error fetching holidays data:', error);
      }
    };

    // 起動時に一度だけAPIリクエストを行う
    fetchData();

    // 6時間ごとにAPIリクエストを行うタイマーを設定
    const fetchHolidaysTimer = setInterval(() => {
      fetchData();
    }, 6 * 60 * 60 * 1000); // 6時間

    // タイマーをクリーンアップする
    return () => {
      clearInterval(fetchHolidaysTimer);
    };
  }, []);

  // 時刻表の更新と表示を行う
  useEffect(() => {
    const isHoliday = holidaysData.hasOwnProperty(moment().format('YYYY-MM-DD'));
    const isPrePost = peakSeason_prePost.includes(moment().format('YYYY-MM-DD'));
    const isPeak = peakSeason.includes(moment().format('YYYY-MM-DD'));
    const isTemp = tempSchedule.includes(moment().format('YYYY-MM-DD'));
    
     // 使用するダイヤの種類を選択する
    let scheduleType = '平日';
    if (isTemp) {
      scheduleType = '平日';
    } else if (isHoliday||isWeekEnd) {
      scheduleType = '土日祝日';
    } else if (isPeak) {
      scheduleType = '繁忙期_1';
    } else if (isPrePost) {
      scheduleType = '繁忙期_2';
    }

    // ダイヤのスケジュールを取得
    const sakurajimaSchedule = ferryTimetable["桜島港"][scheduleType];
    const kagoshimaSchedule = ferryTimetable["鹿児島港"][scheduleType];

    // 時刻表を現在時刻を基準に並び替える
    const sortedSakurajimaSchedule = sortSchedule(sakurajimaSchedule, currentTime);
    const sortedKagoshimaSchedule = sortSchedule(kagoshimaSchedule, currentTime);
    
    // 先発と次発の出発時刻を取得
    const nextDepartureSakurajima = getNextDeparture(sortedSakurajimaSchedule, currentTime);
    const nextDepartureKagoshima = getNextDeparture(sortedKagoshimaSchedule, currentTime);
    
    // 次の次の出発時刻を取得
    const followingDepartureSakurajima = getFollowingDeparture(sortedSakurajimaSchedule, currentTime);
    const followingDepartureKagoshima = getFollowingDeparture(sortedKagoshimaSchedule, currentTime);
    
    // 状態変数を更新する
    setNextDepartureSakurajima(nextDepartureSakurajima);
    setNextDepartureKagoshima(nextDepartureKagoshima);
    setFollowingDepartureSakurajima(followingDepartureSakurajima);
    setFollowingDepartureKagoshima(followingDepartureKagoshima);
  }, [currentTime, holidaysData]);
  
  
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  // バナー広告の切り替え関数
  const switchBanner = () => {
    setCurrentBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
  };

  // バナー広告の切り替えタイマー
  useEffect(() => {
    const bannerTimer = setInterval(switchBanner, 15 * 1000); // 3秒ごとに切り替え
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
  




const isAndroid = Platform.OS === 'android'


  const iosURL = 'https://apps.apple.com/us/app/easy-board-sakurajima-ferry/id6468773953';
  const AndroidURL = 'https://play.google.com/store/apps/details?id=com.kichiset.EasyBoardSakurajimaFerry&pcampaignid=web_share'




  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'タイトル',
        message:
          'EasyBoardSakurajimaFerrya, The Applicatiom of Timeschedule for Sakurajima Ferry.\n Android: https://play.google.com/store/apps/details?id=com.kichiset.EasyBoardSakurajimaFerry&pcampaignid=web_share \n IOS: https://apps.apple.com/us/app/easy-board-sakurajima-ferry/id6468773953',
        
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };




  return (
  <SafeAreaView style={styles.safeArea}>
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentTime}>Current: {currentTime}</Text>
      
      {/* メイン画面から鹿児島港発画面に遷移するフレーム */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Go to Sakurajima(From Kagoshima)'); // 遷移先の画面名を指定
        }}
      >
      <View style={styles.kagoFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>Go to Sakurajima</Text>
        <Text style={styles.nextDeparture}>1st {nextDepartureKagoshima}</Text>
        <Text style={styles.nextDeparture}>2nd {followingDepartureKagoshima}</Text>
      </View>
      </TouchableOpacity>

      {/* メイン画面から桜島港発画面に遷移するフレーム */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Back to Kagoshima(From Sakurajima)'); // 遷移先の画面名を指定
        }}
      >
      <View style={styles.kagoFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>Back to Kagoshima</Text>
        <Text style={styles.nextDeparture}>1st {nextDepartureSakurajima}</Text>
        <Text style={styles.nextDeparture}>2nd {followingDepartureSakurajima}</Text>
      </View>
      </TouchableOpacity>
      
      <View style={styles.headLineNews}>
        <Text>{message[currentTextIndex]}</Text>
      </View>
      

      
        <TouchableOpacity onPress={() => openLink(main_url)} style={styles.linkButton}>
          <Image
            source={require('..//assets/桜島の不思議.png')} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
		<Text style={styles.bannerDescription}>▲Reccomendation Items for this Application.▲</Text>
		<Text style={styles.bannerDescription}>▲Please support for SDGs in Sakurajima.▲</Text>
      
      <TouchableOpacity
        onPress={onShare}
      >
      <View style={styles.shareLink}>
        <Text>Share this Application.</Text>
      </View>
      </TouchableOpacity>
            
        <TouchableOpacity onPress={() => openLink(bannerUrls[currentBannerIndex])} style={styles.linkButtonTop}>
          <Image
            source={bannerImages[currentBannerIndex]} // 画像ファイルのパスを指定
            style={styles.linkButtonImage}
          />
        </TouchableOpacity>
        
        

    </ScrollView>
  </SafeAreaView>
  );
};

export default App;

