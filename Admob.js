import React, { useEffect, useState } from "react";
import {
  Platform,
  Button,
} from "react-native";

import mobileAds ,{
  BannerAd,
  BannerAdSize,
  AppOpenAd,
  InterstitialAd,
  TestIds,
  AdEventType,
}from "react-native-google-mobile-ads";

const isAndroid = Platform.OS == 'android';

// 初期化
mobileAds()
  .initialize()
  .then((adapterStatuses) => {});

// ユニットID
const adBannerUnitId = isAndroid
  ? "ca-app-pub-3179323992080572/4768643736"
  : "ca-app-pub-3179323992080572/5744498265";

export function AdmobFullBanner() {
  return (
    <BannerAd
      unitId={adBannerUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}