"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAdmobNativeAdsAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = config_plugins_1.AndroidConfig.Manifest;
const withAdmobNativeAdsManifest = (config, props) => {
    return (0, config_plugins_1.withAndroidManifest)(config, (config) => {
        config.modResults = setAdmobNativeAdsConfig(config.modResults, props);
        return config;
    });
};
const setAdmobNativeAdsConfig = (androidManifest, props) => {
    let mainApplication = getMainApplicationOrThrow(androidManifest);
    addMetaDataItemToMainApplication(mainApplication, 'com.google.android.gms.ads.APPLICATION_ID', props.androidAppId);
    return androidManifest;
};
const withAdmobNativeAdsAndroid = (config, props) => {
    return withAdmobNativeAdsManifest(config, props);
};
exports.withAdmobNativeAdsAndroid = withAdmobNativeAdsAndroid;
