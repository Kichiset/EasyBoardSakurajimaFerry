import React, { useEffect, useState, useContext } from 'react';
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
  Share,
  AppState
} from 'react-native';

import { styles } from './styles'; // 新しく作成したstyles.jsファイルをインポート

import axios from 'axios';
import moment from 'moment';

import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const isAndroid = Platform.OS == 'android';

const adUnitId = isAndroid
 ? 'ca-app-pub-3179323992080572/5698067704'
 : 'ca-app-pub-3179323992080572/9648166408';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  keywords: ['健康', '食品', 'ファッション', 'ビール'],
});

const API_URL = 'https://holidays-jp.github.io/api/v1/date.json';
const Headline_URL = 'https://raw.githubusercontent.com/Kichiset/EasyBoardSakurajimaFerry/main/HeadlineMessage.json';
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

const peakSeason_prePost = ["2023-12-29", "2023-12-30", "2023-12-31", "2024-01-03"];
const peakSeason = ["2024-01-01","2024-01-02"];
const tempSchedule=["2024-01-14","2024-01-20","2024-01-21","2024-01-27","2024-02-04","2024-02-10","2024-02-11","2024-02-12","2024-02-17","2024-02-18","2024-02-23"];

const isWeekEnd = moment().format('d') % 6 == 0 ? true : false;

// 桜島港と鹿児島港の平日と土日祝日の出発時刻データ
import ferryTimetable from '../timeTable.json';

// 出発時刻の探索関数 (先発と次発を探す)
const getNextDeparture = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm');
  
  return schedule; // 最終便が終わった場合は翌日の最初の便を表示
};

// 時刻表を現在時刻を基準に並び替える関数
const sortSchedule = (schedule, currentTime) => {
  const currentMoment = moment(currentTime, 'HH:mm').add(1, 'm');  //////クソ怪しい処理をしているのでしばらく様子見
  const todaySchedule = schedule.filter(time => moment(time, 'HH:mm') >= currentMoment);
  const nextDaySchedule = schedule.filter(time => moment(time, 'HH:mm') < currentMoment);

  return [...todaySchedule, ...nextDaySchedule];
};

const openLink = (url) => {
  Linking.openURL(url).catch(err => console.error('Failed to open link:', err));
};






















const App = (props) => { // propsを引数として受け取る  // 状態変数の定義
  // 状態変数の定義
  const [currentTime, setCurrentTime] = useState('');
  const [nextDepartureKagoshima, setNextDepartureKagoshima] = useState('');
  const [nextDepartureSakurajima, setNextDepartureSakurajima] = useState('');
  const [holidaysData, setHolidaysData] = useState({});
  const [headline, setHeadline] = useState({});

  // 現在時刻を0.1秒ごとに更新するタイマーを設定する
  useEffect(() => {
    const getCurrentTime = () => {
      const now = moment().format('HH:mm:ss');
      setCurrentTime(now);
    };

    getCurrentTime();

    const timer = setInterval(() => {
      getCurrentTime();
    }, 100);

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
  
  
  
  // ヘッドラインニュースのAPIリクエストを設定する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Headline_URL);
        setHeadline(response.data);
      } catch (error) {
        console.error('Error fetching headline data:', error);
      }
    };
    // 起動時に一度、APIリクエストを行う
    fetchData();

    // 1分ごとにAPIリクエストを行うタイマーを設定
    const fetchHeadlineTimer = setInterval(() => {
      fetchData();
    }, 15 * 1000);

    // タイマーをクリーンアップする
    return () => {
      clearInterval(fetchHeadlineTimer);
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
    } else if (isPrePost) {
      scheduleType = '繁忙期_1';
    } else if (isPeak) {
      scheduleType = '繁忙期_2';
    }else if (isHoliday||isWeekEnd) {
      scheduleType = '土日祝日';
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
    
    // 状態変数を更新する
    setNextDepartureSakurajima(nextDepartureSakurajima);
    setNextDepartureKagoshima(nextDepartureKagoshima);
  }, [currentTime, holidaysData]);

 // 画面遷移する関数
  const goToScreenNotification = () => {
    // `navigation.navigate`で画面遷移し、`userData`をパラメータとして渡す
    navigation.navigate('Notification', {});
  };
  
  let setPort;
  const GetPort = () => {
     Port = setPort;
  return(Port)
  } 
  
  const KagoPort = "Go to Sakurajima"
  const SakuPort = "Back to Kagoshima"

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


  // テキスト広告の切り替え関数
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const messageLength = Object.keys(headline).length;
   const maxMessageLength = 100;
 
  const switchText = () => {
    setCurrentTextIndex(prevIndex => (prevIndex + 1) % maxMessageLength); //message.length);
  };
  // テキスト広告の切り替えタイマー
  useEffect(() => {
    const textTimer = setInterval(switchText, 5 * 1000); // 5秒ごとに切り替え
    return () => clearInterval(textTimer); // クリーンアップ
  }, []);



{/*
  // Preload an app open ad
  appOpenAd.load();

  const [closed, setClosed] = useState(false);
  useEffect(() => {
    const unsubscribe = appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      setClosed(true);
  });
  // Start loading the interstitial straight away
  appOpenAd.load();
  // Unsubscribe from events on unmount
  return unsubscribe;
}, []);

const [flag, setFlag] = useState(false);
const [isBackground, setAppState] = useState(false);
  useEffect(() => {
    const onChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState != "active");
      setFlag(nextAppState != "active");
    };
      AppState.addEventListener("change", onChange);

    return () => {
      AppState.removeEventListener("change", onChange), setFlag;
    };
  }, []);


  



  console.log(appOpenAd.loaded, isBackground, closed, flag)

  const iosURL = 'https://apps.apple.com/us/app/easy-board-sakurajima-ferry/id6468773953';
  const AndroidURL = 'https://play.google.com/store/apps/details?id=com.kichiset.EasyBoardSakurajimaFerry&pcampaignid=web_share'



  // ここに復帰判定
  if(appOpenAd.loaded && flag){
    appOpenAd.show();
    appOpenAd.load();
  }
*/}

  async function onShare() {
    try {
      const result = await Share.share({
        title: 'タイトル',
        message:'EasyBoardSakurajimaFerrya, The Applicatiom of Timeschedule for Sakurajima Ferry.\n Android: https://play.google.com/store/apps/details?id=com.kichiset.EasyBoardSakurajimaFerry&pcampaignid=web_share \n IOS: https://apps.apple.com/us/app/easy-board-sakurajima-ferry/id6468773953',
        
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
  }

<StatusBar style="auto" />

  return (
  <SafeAreaView style={styles.safeArea}>
    <AdmobFullBanner />
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.currentTime}>Current: {currentTime}</Text>
      
      {/* メイン画面から鹿児島港発画面に遷移するフレーム */}
      <TouchableOpacity
        
        onPress={() => {
          Dept = nextDepartureKagoshima
          setPort = KagoPort
          Port = GetPort(setPort)
          props.navigation.navigate('Go to Sakurajima(From Kagoshima)',Dept,Port); // 遷移先の画面名を指定
        }}
      >
      <View style={styles.kagoFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>Go to Sakurajima</Text>
        <Text style={styles.nextDeparture}>1st {nextDepartureKagoshima[0]}</Text>
        <Text style={styles.nextDeparture}>2nd {nextDepartureKagoshima[1]}</Text>
      </View>
      </TouchableOpacity>

      {/* メイン画面から桜島港発画面に遷移するフレーム */}
      <TouchableOpacity
      
        onPress={() => {
          Dept = nextDepartureSakurajima
          setPort = SakuPort
          Port = GetPort(setPort)
          props.navigation.navigate('Back to Kagoshima(From Sakurajima)',nextDepartureSakurajima,Port); // 遷移先の画面名を指定
        }
        }
      >
      <View style={styles.kagoFrame}>
        <Text style={[styles.portTitle, styles.bottomColumn]}>Back to Kagoshima</Text>
        <Text style={styles.nextDeparture}>1st {nextDepartureSakurajima[0]}</Text>
        <Text style={styles.nextDeparture}>2nd {nextDepartureSakurajima[1]}</Text>
      </View>
      </TouchableOpacity>
      
      <View style={styles.headLineNews}>
      <Text>{headline[currentTextIndex % messageLength +1]}</Text>
      {/*}<Text>{headline[currentTextIndex]}</Text>*/}
      
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

