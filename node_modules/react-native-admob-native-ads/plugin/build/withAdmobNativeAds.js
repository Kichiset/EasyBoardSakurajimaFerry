"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const withAdmobNativeAdsAndroid_1 = require("./withAdmobNativeAdsAndroid");
const withAdmobNativeAdsAppBuildGradle_1 = require("./withAdmobNativeAdsAppBuildGradle");
const withAdmobNativeAdsInfoPlist_1 = require("./withAdmobNativeAdsInfoPlist");
const withAdmobNativeAdsPod_1 = require("./withAdmobNativeAdsPod");
const pkg = require("react-native-admob-native-ads/package.json");
const withAdmobNativeAds = (config, props) => {
    config = (0, withAdmobNativeAdsAndroid_1.withAdmobNativeAdsAndroid)(config, props);
    config = (0, withAdmobNativeAdsAppBuildGradle_1.withAdmobNativeAdsGradle)(config);
    config = (0, withAdmobNativeAdsInfoPlist_1.withAdmobNativeAdsPlist)(config, props);
    config = (0, withAdmobNativeAdsPod_1.withAdmobNativeAdsPodNat)(config, props);
    return config;
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withAdmobNativeAds, pkg.name, pkg.version);
